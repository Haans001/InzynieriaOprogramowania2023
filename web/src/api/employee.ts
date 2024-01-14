import api from "src/config/axios";
import { Employee } from "./auth";

export interface UpsertEmployeePayload {
  first_name: string;
  last_name: string;
  username: string;
  password?: string;
  email: string;
  about: string;
  role: "ADMIN" | "EMPLOYEE";
}

export const _addEmployee = async (values: UpsertEmployeePayload) => {
  const response = await api.post("/employee", values);
  return response.data;
};

export const _getAllEmployees = async () => {
  const response = await api.get("/employee");
  return response.data as Employee[];
};

export const _updateEmployee = async (
  employee: UpsertEmployeePayload,
  id: number,
) => {
  const response = await api.patch(`/employee/${id}`, {
    ...employee,
  });
  return response.data;
};

export const _deleteEmployee = async (id: number) => {
  const response = await api.delete(`/employee/${id}`);
  return response.data;
};
