import FormTextInput from "src/components/shared/form/form-text-input";
import { ZIndex } from "src/utils/zIndex";
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
import { Employee } from "src/api/employee";
import { getInitialValues, validationSchema } from "./form";

interface Props {
  open: boolean;
  handleClose: () => void;
  employees: Employee[];
  employee?: Employee;
  onSubmit: (values: any) => Promise<void>;
  title: string;
  description: string;
  submitButtonLabel: string;
}

const EmployeeFormDialog: React.FC<Props> = ({ 
  open, 
  handleClose,
  onSubmit,
  employees,
  employee,
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
          initialValues={getInitialValues(employee ?? ({} as Employee))}
        >
          <Form>
            <Stack direction={"row"} spacing={2}>
              <FormTextInput
                autoFocus
                margin="dense"
                label="Imię"
                type="text"
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
              label="Numer telefonu"
              type="text"
              name="phone"
              fullWidth
            />
            <FormTextInput
              autoFocus
              margin="dense"
              label="Adres e-mail"
              type="text"
              name="email"
              fullWidth
            />
            <Stack direction={"row"} spacing={2}>
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
                label="Numer"
                type="number"
                name="number"
                fullWidth
              />
            </Stack>
            <Stack direction={"row"} spacing={2}>
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
            <FormTextInput
              autoFocus
              margin="dense"
              label="O mnie"
              type="text"
              name="about"
              fullWidth
              multiline
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
