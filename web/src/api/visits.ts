import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface UpsertVisitPayload {
  time_start: string;
  time_end: string;
  note: string;
  client_id: string;
}

export const _addVisit = async (visit: UpsertVisitPayload) => {
  const response = await api.post("/visit", {
    ...visit,
    client_id: parseInt(visit.client_id),
  });
  return response.data;
};

export interface Client {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Visit {
  id: number;
  time_start: string;
  time_end: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  user: Client;
}

export const _getVisitsForDay = async (day: string) => {
  const response = await api.get(`/visit/day/${day}`);
  return response.data as Visit[];
};

export const _updateVisit = async (visit: UpsertVisitPayload, id: number) => {
  const response = await api.patch(`/visit/${id}`, {
    ...visit,
    client_id: parseInt(visit.client_id),
  });
  return response.data;
};
