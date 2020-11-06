import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../services/api";
import * as auth from "../services/auth";

interface User {
  email: string;
  avatar: string;
  token: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(inputs: auth.ILoginData): Promise<string | undefined>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const user = await AsyncStorage.getItem("@proffy:user");
      const token = await AsyncStorage.getItem("@proffy:token");

      if (user && token) {
        auth.isAuthenticated(token)?.then((res) => {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          setUser({
            email: res.data.email || "",
            avatar: res.data.avatar || "",
            token,
          });
        });
      }
      setLoading(false);
    }
    loadData();
  }, []);

  async function signIn(inputs: auth.ILoginData): Promise<string | undefined> {
    return auth
      .signIn(inputs.email, inputs.password)
      .then(async (response) => {
        if (response.data) {
          api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

          if (inputs.remember) {
            await AsyncStorage.setItem("@proffy:token", response.data.token);
            await AsyncStorage.setItem(
              "@proffy:user",
              JSON.stringify({
                avatar: response.data.avatar,
                email: response.data.email,
              })
            );
          }

          setUser({
            email: response.data.email,
            avatar: response.data.avatar,
            token: response.data.token,
          });
        }
      })
      .catch((error) => {
        return error.response.data.message;
      });
  }

  async function signOut() {
    await AsyncStorage.clear();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
