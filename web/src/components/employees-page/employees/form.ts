import { Employee } from "src/api/employee";
import * as Yup from "yup";

export const validationSchema = Yup.object({
  first_name: Yup.string().required("Pole wymagane"),
  last_name: Yup.string().required("Pole wymagane"),
  phone: Yup.string()
    .required("Pole wymagane")
    .matches(/^\d{9}$/, "Niepoprawny numer telefonu"),
  email: Yup.string()
    .email("Niepoprawny adres email")
    .required("Pole wymagane"),
  postcode: Yup.string()
    .matches(/^\d{2}-\d{3}$/, "Niepoprawny kod")
    .optional()
});

export const getInitialValues = (employee: Employee) => ({
  first_name: employee?.first_name ?? "",
  last_name: employee?.last_name ?? "",
  phone: employee?.phone ?? "",
  email: employee?.email ?? "",
  address: employee?.address ?? "",
  about: employee?.about ?? "",
});
