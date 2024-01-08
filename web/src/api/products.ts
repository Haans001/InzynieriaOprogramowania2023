import api from "src/config/axios";

export interface UpsertProductPayload{
    name: string;
    amount: number;
    description: string;
}

export interface Product{
    id: number;
    name: string;
    amount: number;
    description: string;
}

export const _getAllProducts = async () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Nożyczki",
      amount: 3,
      description: "",
    },
    {
      id: 2,
      name: "Grzebień",
      amount: 5,
      description: "",
    },
    {
      id: 3,
      name: "Farba czarna",
      amount: 4,
      description: "",
    },
    {
      id: 4,
      name: "Rozjaśniacz",
      amount: 1,
      description: "Rozjaśniacz Loreal 100 ml",
    },
  ];
  //const response = await api.get("/products");
  //return response.data as Product[];
  const response = products;
  return response;
};

export const _addProduct = async (product: UpsertProductPayload) => {
    const response = await api.post("/product", {
      ...product,
    });
    return response.data;
  };
  
  export const _updateProduct = async (product: UpsertProductPayload, id: number) => {
    const response = await api.patch(`/product/${id}`, {
      ...product,
    });
    return response.data;
  };