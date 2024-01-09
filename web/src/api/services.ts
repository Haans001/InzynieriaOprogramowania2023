import api from "src/config/axios";

export interface UpsertServicePayload {
  name: string;
  time: number;
  price: number;
}

export interface Service {
  id: number;
  name: string;
  time: number;
  price: number;
}

export const _getAllServices = async () => {
  const response = await api.get("/service");
  return response.data as Service[];
};

export const _addService = async (service: UpsertServicePayload) => {
  const response = await api.post("/service", {
    ...service,
  });
  return response.data;
};

export const _updateService = async (
  service: UpsertServicePayload,
  id: number,
) => {
  const response = await api.patch(`/service/${id}`, {
    ...service,
  });
  return response.data;
};
