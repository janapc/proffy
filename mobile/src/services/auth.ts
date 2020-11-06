import api from "./api";

export interface ILoginData {
  email: string;
  password: string;
  remember?: boolean;
}

interface ILoginPromise {
  data: {
    email: string;
    token: string;
    avatar: string;
  };
  response?: {
    data: {
      message: string;
    };
  };
}

export function isAuthenticated(token: string): Promise<ILoginPromise> {
  return api.get("auth", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function signIn(
  email: string,
  password: string
): Promise<ILoginPromise> {
  return api.post("login", {
    email,
    password,
  });
}
