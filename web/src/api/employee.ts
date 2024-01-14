import api from "src/config/axios";
import { Employee } from "./auth";

export interface AddEmployeePayload {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  about: string;
}

export interface UpsertEmployeePayload {
  last_name: string;
  first_name: string;
  phone: string;
  email: string;
  address: string;
  about: string;
}

export const _addEmployee = async (values: AddEmployeePayload) => {
  const response = await api.post("/employee", values);
  return response.data;
};

export const _getAllEmployees = async () => {
  //const response = await api.get("/employee");
  //return response.data as Employee[];
  const employees: Employee[] = [
    {
      id: 1,
      first_name: "Nożyczki",
      last_name: "Kol",
      phone: "111",
      email: "ll@ll",
      address: "ddd",
      about: "aa",
    },
    {
      id: 2,
      first_name: "Nożyczki",
      last_name: "Kol",
      phone: "111",
      email: "ll@ll",
      address: "ddd",
      about: "aa",
    },
    {
      id: 3,
      first_name: "Nożyczki",
      last_name: "Kol",
      phone: "111",
      email: "ll@ll",
      address: "ddd",
      about: "aa",
    },
    {
      id: 4,
      first_name: "Nożyczki",
      last_name: "Kol",
      phone: "111",
      email: "ll@ll",
      address: "ddd",
      about: "aa",
    },
  ];
  const response = employees;
  return response;
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
