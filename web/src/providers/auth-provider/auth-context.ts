import * as React from "react";
import { Employee } from "src/api/auth";

export interface AuthContextType {
  employee: Employee | null;
  login: (username: string, password: string) => Promise<unknown>;
  logout: () => void;
  getToken: () => string | null;
}

export const AuthContext = React.createContext<AuthContextType>({
  employee: null,
  login: () => {
    throw new Error("login() not implemented");
  },
  logout: () => {
    throw new Error("logout() not implemented");
  },
  getToken: () => {
    throw new Error("getToken() not implemented");
  },
});
