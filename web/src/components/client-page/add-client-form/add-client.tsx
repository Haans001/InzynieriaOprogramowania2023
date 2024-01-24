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
        fontWeight={500}
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
            address: [
              values.city,
              values.street,
              values.flatNumber,
              values.postcode,
            ].join(", "),
          });
          helpers.resetForm();
        }}
        validationSchema={validationSchema}
        initialValues={{
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          street: "",
          flatNumber: "",
          postcode: "",
          city: "",
        }}
      >
        <Form>
          <Stack direction="row" spacing={2}>
            <FormTextInput
              margin="dense"
              label="Imie"
              name="first_name"
              fullWidth
            />
            <FormTextInput
              margin="dense"
              label="Nazwisko"
              type="text"
              name="last_name"
              fullWidth
            />
          </Stack>
          <FormTextInput
            margin="dense"
            label="Telefon"
            type="text"
            name="phone"
            fullWidth
          />
          <FormTextInput
            margin="dense"
            label="Email"
            type="email"
            name="email"
            fullWidth
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{
              marginTop: "20px",
            }}
          >
            <FormTextInput
              margin="dense"
              label="Ulica"
              type="text"
              name="street"
              fullWidth
            />
            <FormTextInput
              margin="dense"
              label="Numer budynku"
              type="text"
              name="flatNumber"
              fullWidth
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              marginTop: "20px",
            }}
          >
            <FormTextInput
              margin="dense"
              label="Kod pocztowy"
              type="text"
              name="postcode"
              fullWidth
            />
            <FormTextInput
              margin="dense"
              label="Miejscowość"
              type="text"
              name="city"
              fullWidth
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems={"center"}
            sx={{
              marginTop: "20px",
            }}
          >
            <Button type="reset"
              sx={{
                fontWeight: "400",
                color: "#FCF9EC",
                backgroundColor: "#B32222",
                marginTop: "20px",
                '&:hover': {
                  backgroundColor: "red", 
                },
              }}
            >
              Odrzuć
            </Button>
            <Button 
              variant="contained" 
              type="submit"
              sx={{
                color: "#FCF9EC",
                backgroundColor: "#C6A619",
                fontWeight: "400",
                marginTop: "20px",
                '&:hover': {
                  backgroundColor: "#167014", 
                },
              }}
            >
              Dodaj klienta
            </Button>
          </Stack>
        </Form>
      </Formik>
    </>
  );
};

export default AddClientForm;
