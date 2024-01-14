import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Form, Formik } from "formik";
import FormSelectInput from "src/components/shared/form/form-select-input";
import FormTextInput from "src/components/shared/form/form-text-input";
import { ZIndex } from "src/utils/zIndex";
import { getInitialValues, validationSchema } from "./form";

interface Props {
  open: boolean;
  handleClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  title: string;
  description: string;
  submitButtonLabel: string;
  isEdit?: boolean;
}

const EmployeeFormDialog: React.FC<Props> = ({
  open,
  handleClose,
  onSubmit,
  title,
  description,
  submitButtonLabel,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        zIndex: ZIndex.DIALOG,
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          width: "600px",
        }}
      >
        <DialogContentText
          sx={{
            marginBottom: "20px",
          }}
        >
          {description}
        </DialogContentText>
        <Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          initialValues={getInitialValues()}
        >
          <Form>
            <Stack direction={"row"} spacing={2}>
              <FormTextInput
                margin="dense"
                label="Imię"
                type="text"
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
              label="Adres e-mail"
              type="text"
              name="email"
              fullWidth
            />

            <FormTextInput
              margin="dense"
              label="O mnie"
              type="text"
              name="about"
              fullWidth
              multiline
              sx={{
                marginBottom: "20px",
              }}
            />
            <FormSelectInput
              name="role"
              label="Ranga"
              placeholder="Wybierz rangę"
              options={[
                {
                  value: "ADMIN",
                  label: "Administrator",
                },
                {
                  value: "EMPLOYEE",
                  label: "Pracownik",
                },
              ]}
            />
            <DialogContentText
              sx={{
                color: "black",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              Dane do logowania
            </DialogContentText>
            <FormTextInput
              margin="dense"
              label="Nazwa Użytkownika"
              type="text"
              name="username"
              fullWidth
            />
            <FormTextInput
              margin="dense"
              label="Hasło"
              type="password"
              name="password"
              fullWidth
            />
            <DialogActions
              sx={{
                marginTop: "20px",
              }}
            >
              <Button onClick={handleClose} type="button">
                Odrzuć
              </Button>
              <Button type="submit">{submitButtonLabel}</Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeFormDialog;
