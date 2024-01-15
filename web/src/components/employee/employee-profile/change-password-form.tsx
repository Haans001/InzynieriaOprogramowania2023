import { Alert, Button, Snackbar, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import * as React from "react";
import { ChangePasswordPayload, _changePassword } from "src/api/auth";
import FormTextInput from "src/components/shared/form/form-text-input";
import * as Yup from "yup";

const ChangePasswordForm: React.FunctionComponent = () => {
  const [successToastOpen, setSuccessToastOpen] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);

  const { mutateAsync: changePassword } = useMutation({
    mutationFn: (values: ChangePasswordPayload) => _changePassword(values),
  });

  const handleSubmit = async (values: ChangePasswordPayload, helpers: any) => {
    console.log(values);

    setError(null);

    try {
      const { success, message } = await changePassword(values);
      if (!success) {
        setError(message || "Nieznany błąd.");
        return;
      }
      setSuccessToastOpen(true);
      helpers.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "20px",
        }}
      >
        Zmiana hasła
      </Typography>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          newPasswordConfirm: "",
        }}
        validationSchema={Yup.object({
          currentPassword: Yup.string().required("Pole wymagane"),
          newPassword: Yup.string().required("Pole wymagane"),
          newPasswordConfirm: Yup.string()
            .oneOf(
              [Yup.ref("newPassword"), undefined],
              "Hasła muszą być takie same",
            )
            .required("Pole wymagane"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, submitForm }) => (
          <Form>
            <Stack spacing={2}>
              <FormTextInput
                fullWidth
                id="currentPassword"
                name="currentPassword"
                label="Stare hasło"
                type="password"
              />
              <FormTextInput
                fullWidth
                id="newPassword"
                name="newPassword"
                label="Nowe hasło"
                type="password"
              />
              <FormTextInput
                fullWidth
                id="newPasswordConfirm"
                name="newPasswordConfirm"
                label="Powtórz nowe hasło"
                type="password"
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
                fullWidth
                type="submit"
                onClick={submitForm}
                variant="contained"
                disabled={isSubmitting}
              >
                Zmień hasło
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={successToastOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessToastOpen(false)}
      >
        <Alert
          onClose={() => setSuccessToastOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Pomyślnie zmieniono hasło.
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangePasswordForm;
