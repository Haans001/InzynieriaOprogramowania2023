import api from "src/config/axios";

export interface UpsertServicePayload{
    name: string;
    time: number;
    price: number;
    description: string;
}

export interface Service{
    id: number;
    name: string;
    time: number;
    price: number;
    description: string;
}

export const _getAllServices = async () => {
  //const response = await api.get("/Services");
  //return response.data as Service[];
  const services: Service[] = [
    {
      id: 1,
      name: "Strzyżenie męskie",
      time: 30,
      price: 50,
      description: "",
    },
    {
      id: 2,
      name: "Farbowanie krótkich włosów",
      time: 60,
      price: 100,
      description: "Farbowanie włosów powyżej linii ramion",
    },
    {
      id: 3,
      name: "Farbowanie długich włosów",
      time: 90,
      price: 150,
      description: "Farbowanie włosów poniżej linii ramion",
    },
    {
      id: 4,
      name: "Podcięcie końcówek",
      time: 40,
      price: 60,
      description: "",
    },
  ];
  const response = services;
  return response;
};

export const _addService = async (service: UpsertServicePayload) => {
    const response = await api.post("/service", {
      ...service,
    });
    return response.data;
  };
  
  export const _updateService = async (service: UpsertServicePayload, id: number) => {
    const response = await api.patch(`/service/${id}`, {
      ...service,
    });
    return response.data;
  };