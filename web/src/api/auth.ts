import api from "src/config/axios";

interface LoginResponse {
  access_token: string;
}

export interface Employee {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  id: number;
  role: "ADMIN" | "EMPLOYEE";
}

export const _login = async (username: string, password: string) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });
  return response.data as LoginResponse;
};

export const _getProfile = async () => {
  const response = await api.get("/auth/profile");
  console.log(response.data);
  return response.data as Employee;
};
