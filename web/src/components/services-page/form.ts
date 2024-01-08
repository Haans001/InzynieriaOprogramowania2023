import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Pole wymagane"),
  time: Yup.number().integer("Czas wykonania musi być liczbą całkowitą").min(1, "Czas wykonania dłuższy od 1 minuty").required("Pole wymagane"),
  price: Yup.number().min(0.1, "Cena musi być wyższa niż 0.1 zł").required("Pole wymagane"),
});
