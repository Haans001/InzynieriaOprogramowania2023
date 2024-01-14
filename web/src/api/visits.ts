import api from "src/config/axios";
import { Employee } from "./auth";
import { Client } from "./client";
import { Service } from "./services";

export interface UpsertVisitPayload {
  time_start: string;
  time_end: string;
  note: string;
  client_id: number;
  service_id: number;
  employee_id: number;
}

export interface Visit {
  id: number;
  time_start: string;
  time_end: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  user: Client;
  service: Service;
  Employee: Employee;
}

export const _addVisit = async (visit: UpsertVisitPayload) => {
  const response = await api.post("/visit", visit);
  return response.data;
};

export const _getVisitsForDay = async (day: string) => {
  const response = await api.get(`/visit/day/${day}`);
  return response.data as Visit[];
};

export const _updateVisit = async (visit: UpsertVisitPayload, id: number) => {
  const response = await api.patch(`/visit/${id}`, visit);
  return response.data;
};

export const _deleteVisit = async (id: number) => {
  const response = await api.delete(`/visit/${id}`);
  return response.data;
};
