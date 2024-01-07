import api from "src/config/axios";
import { Visit } from "./visits";

export interface AddClientPayload {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
}

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export const _addClient = async (values: AddClientPayload) => {
  const response = await api.post("/client", values);
  return response.data;
};

export const _getAllClients = async () => {
  const response = await api.get("/client");
  return response.data as Client[];
};

interface GetClientData extends Client {
  Visit: Visit[];
}

export const _getClient = async (id: number) => {
  const response = await api.get(`/client/${id}`);
  return response.data as GetClientData;
};
