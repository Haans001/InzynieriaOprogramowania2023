import * as Yup from "yup";

export const validationSchema = Yup.object({
  first_name: Yup.string().required("Pole wymagane"),
  last_name: Yup.string().required("Pole wymagane"),
  phone: Yup.string()
    .matches(/^\d{9}$/, "Niepoprawny numer telefonu")
    .required("Pole wymagane"),
  email: Yup.string()
    .email("Niepoprawny adres email")
    .required("Pole wymagane"),
});
