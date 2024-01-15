"use client";
import { Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as React from "react";
import { useAuth } from "src/providers/auth-provider";
import * as Yup from "yup";
import FormTextInput from "../shared/form/form-text-input";
const LoginForm = () => {
  const { login } = useAuth();

  const [error, setError] = React.useState<string | null>(null);

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={async (values) => {
        try {
          const res = await login(values.username, values.password);
        } catch (error: any) {
          setError(error?.response?.data?.message || "Nieznany błąd.");
        }
      }}
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
          {error && (
            <Typography
              sx={{
                marginTop: "20px",
                color: "red",
              }}
            >
              {error}
            </Typography>
          )}
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
