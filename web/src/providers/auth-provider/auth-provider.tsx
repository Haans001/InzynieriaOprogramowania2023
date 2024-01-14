"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { _getProfile, _login } from "src/api/auth";
import { AuthContext } from "./auth-context";

const TOKEN_KEY = "token";

const AuthProvider: React.FunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const { push } = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  const { mutateAsync: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => _login(username, password),
    onSuccess: (data) => {
      localStorage.setItem(TOKEN_KEY, data.access_token);
      push("/dashboard");
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => _getProfile(),
    retry: false,
    enabled: !isLoginPage,
  });

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY) || null;
  };

  if (!isLoading && !data && !isLoginPage) {
    push("/login");
    return null;
  }

  const contextValue = {
    employee: data || null,
    login: async (username: string, password: string) =>
      await login({ username, password }),
    logout: () => {},
    getToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {(!isLoading || isLoginPage) && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
