"use client";
import { Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useAuth } from "src/providers/auth-provider";
import * as Yup from "yup";
import FormTextInput from "../shared/form/form-text-input";

const LoginForm = () => {
  const { login } = useAuth();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={async (values) => await login(values.username, values.password)}
      validationSchema={Yup.object({
        username: Yup.string().required("To pole jest wymagane"),
        password: Yup.string().required("To pole jest wymagane"),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              marginBottom: "20px",
            }}
          >
            Zaloguj się
          </Typography>

          <FormTextInput
            label="Nazwa użytkownika"
            type="text"
            name="username"
            fullWidth
          />
          <FormTextInput
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            sx={{
              marginTop: "20px",
            }}
          />

          <Button
            disabled={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zaloguj się
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
