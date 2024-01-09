import { Button, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import { Service } from "src/api/services";
import FormTextInput from "src/components/shared/form/form-text-input";
import { ZIndex } from "src/utils/zIndex";
import { getInitialValues, validationSchema } from "./form";

interface Props {
  open: boolean;
  handleClose: () => void;
  services: Service[];
  service?: Service;
  onSubmit: (values: any) => Promise<void>;
  title: string;
  description: string;
  submitButtonLabel: string;
}

const ServiceFormDialog: React.FC<Props> = ({
  open,
  handleClose,
  services,
  service,
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
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          initialValues={getInitialValues(service ?? ({} as Service))}
        >
          <Form>
            <FormTextInput
              autoFocus
              margin="dense"
              label="Nazwa usługi"
              type="text"
              name="name"
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <FormTextInput
                autoFocus
                margin="dense"
                label="Czas trwania (w minutach)"
                type="text"
                name="time"
                fullWidth
              />
              <FormTextInput
                autoFocus
                margin="dense"
                label="Cena (w PLN)"
                type="text"
                name="price"
                fullWidth
              />
            </Stack>
            <FormTextInput
              autoFocus
              margin="dense"
              label="Opis usługi"
              type="text"
              name="description"
              fullWidth
              multiline
              rows={2}
              maxRows={4}
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

export default ServiceFormDialog;
