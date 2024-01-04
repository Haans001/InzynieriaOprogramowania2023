import FormTextInput from "@/components/shared/form/form-text-input";
import { Button, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as React from "react";


const AddClientForm: React.FC = () => {
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
          onSubmit={console.log}
          initialValues={{
            name: "",
            surname: "",
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
                name="name"
                fullWidth
              />
              <FormTextInput
                autoFocus
                margin="dense"
                label="Nazwisko"
                type="text"
                name="surname"
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
            <Button type="reset">
              Odrzuć
            </Button>
            
            <Button type="submit">
                Dodaj klienta
            </Button>
          </Form>
        </Formik>
        </>
  );
};

export default AddClientForm;
