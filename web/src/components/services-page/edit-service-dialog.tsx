import { Button, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import FormTextInput from "src/components/shared/form/form-text-input";
import { ZIndex } from "src/utils/zIndex";
import { validationSchema } from "./form";

interface Props {
  open: boolean;
  handleClose: () => void;
  service: Service;
}

const AddServiceDialog: React.FC<Props> = ({ open, handleClose, service }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        zIndex: ZIndex.DIALOG,
      }}
    >
      <DialogTitle>Edycja usługi</DialogTitle>
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
          Zmień wybrane pola
        </DialogContentText>
        <Formik
          validationSchema={validationSchema}
          onSubmit={console.log}
          initialValues={{
            name: service.name,
            time: service.time,
            price: service.price,
          }}
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
            <DialogActions
              sx={{
                marginTop: "20px",
              }}
            >
              <Button onClick={handleClose} type="button">
                Odrzuć
              </Button>
              <Button type="submit">Edytuj usługę</Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceDialog;
