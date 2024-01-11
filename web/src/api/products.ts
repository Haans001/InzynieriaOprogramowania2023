import api from "src/config/axios";

export interface UpsertProductPayload {
  name: string;
  quantity: number;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  description: string;
}

export const _getAllProducts = async () => {
  const response = await api.get("/product");
  return response.data as Product[];
};

export const _addProduct = async (product: UpsertProductPayload) => {
  const response = await api.post("/product", product);
  return response.data;
};

export const _updateProduct = async (
  product: UpsertProductPayload,
  id: number,
) => {
  const response = await api.patch(`/product/${id}`, product);
  return response.data;
};
