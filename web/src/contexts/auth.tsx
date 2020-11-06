import React, { createContext, useState, useEffect, useContext } from "react";
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
    let user =
      localStorage.getItem("@proffy:user") ||
      sessionStorage.getItem("@proffy:user");
    let token =
      localStorage.getItem("@proffy:token") ||
      sessionStorage.getItem("@proffy:token");
    if (user && token) {
      auth.isAuthenticated(token)?.then((res) => {
        api.defaults.headers.Authorization = `Bearer ${token}`;

        if (user) setUser(res.data);
      });
    }
    setLoading(false);
  }, []);

  async function signIn(inputs: auth.ILoginData): Promise<string | undefined> {
    return auth
      .signIn(inputs.email, inputs.password)
      .then((response) => {
        if (response.data) {
          api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

          if (inputs.remember) {
            localStorage.setItem("@proffy:token", response.data.token);
            localStorage.setItem(
              "@proffy:user",
              JSON.stringify({
                avatar: response.data.avatar,
                email: response.data.email,
              })
            );
          } else {
            sessionStorage.setItem("@proffy:token", response.data.token);
            sessionStorage.setItem(
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
      .catch((error) => error.response.data.message);
  }

  function signOut() {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
