import { Employee } from "src/api/auth";
import * as Yup from "yup";

export const validationSchema = Yup.object({
  first_name: Yup.string().required("Pole wymagane"),
  last_name: Yup.string().required("Pole wymagane"),
  username: Yup.string().required("Pole wymagane"),
  email: Yup.string()
    .email("Niepoprawny adres email")
    .required("Pole wymagane"),
  password: Yup.string()
    .required("Pole wymagane")
    .min(8, "Hasło musi mieć co najmniej 8 znaków"),
  role: Yup.string().required("Pole wymagane"),
});

export const getInitialValues = (employee?: Employee) => ({
  first_name: employee?.first_name ?? "",
  last_name: employee?.last_name ?? "",
  username: employee?.username ?? "",
  email: employee?.email ?? "",
  about: employee?.about ?? "",
  role: employee?.role ?? "EMPLOYEE",
});
