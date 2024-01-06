import { Button, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import * as React from "react";
import { AddClientPayload, _addClient } from "src/api/client";
import FormTextInput from "src/components/shared/form/form-text-input";
import { validationSchema } from "./form";

interface Props {}

const AddClientForm: React.FunctionComponent<Props> = ({}) => {
  const client = useQueryClient();

  const { mutateAsync: addClient } = useMutation({
    mutationFn: (values: AddClientPayload) => _addClient(values),
    onSuccess: () => {
      client.refetchQueries({
        queryKey: ["clients"],
      });
    },
  });

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        fontWeight={700}
        sx={{
          marginBottom: "40px",
        }}
      >
        Wypełnij formularz, aby dodać klienta
      </Typography>
      <Formik
        onSubmit={async (values, helpers) => {
          await addClient({
            ...values,
            address: "Komoranów 7/23",
          });
          helpers.resetForm();
        }}
        validationSchema={validationSchema}
        initialValues={{
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
        }}
      >
        <Form>
          <Stack direction="row" spacing={2}>
            <FormTextInput
              autoFocus
              margin="dense"
              label="Imie"
              name="first_name"
              fullWidth
            />
            <FormTextInput
              autoFocus
              margin="dense"
              label="Nazwisko"
              type="text"
              name="last_name"
              fullWidth
            />
          </Stack>
          <FormTextInput
            autoFocus
            margin="dense"
            label="Telefon"
            type="text"
            name="phone"
            fullWidth
          />
          <FormTextInput
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            name="email"
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <FormTextInput
              autoFocus
              margin="dense"
              label="Ulica"
              type="text"
              name="street"
              fullWidth
            />
            <FormTextInput
              autoFocus
              margin="dense"
              label="Numer budynku"
              type="text"
              name="flatNumber"
              fullWidth
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <FormTextInput
              autoFocus
              margin="dense"
              label="Kod pocztowy"
              type="text"
              name="postcode"
              fullWidth
            />
            <FormTextInput
              autoFocus
              margin="dense"
              label="Miejscowość"
              type="text"
              name="city"
              fullWidth
            />
          </Stack>
          <Button type="reset">Odrzuć</Button>
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
            }}
            type="submit"
          >
            Dodaj klienta
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default AddClientForm;
