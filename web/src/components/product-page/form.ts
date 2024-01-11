import { Product } from "src/api/products";
import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Pole wymagane"),
  amount: Yup.number()
    .integer("Ilość musi być całkowita")
    .min(0, "Ilość większa lub równa 0")
    .required("Ilość produktu musi być większa od 0"),
  description: Yup.string().optional(),
});

export const getInitialValues = (product: Product) => ({
  name: product?.name ?? "",
  amount: product?.quantity ?? "",
  description: product?.description ?? "",
});
