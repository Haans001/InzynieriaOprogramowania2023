import { Button, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import FormTextInput from "src/components/shared/form/form-text-input";
import { ZIndex } from "src/utils/zIndex";

interface Props {
  open: boolean;
  handleClose: () => void;
  date: string;
}

const AddVisitDialog: React.FC<Props> = ({ open, handleClose, date }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        zIndex: ZIndex.DIALOG,
      }}
    >
      <DialogTitle>Dodaj wizyte na dzień {date}</DialogTitle>
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
          Wypełnij poniższe pola aby dodać wizyte
        </DialogContentText>
        <Formik
          onSubmit={console.log}
          initialValues={{
            name: "",
            surname: "",
            phone: "",
            email: "",
            service: "",
            time_start: "",
            time_end: "",
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
            <FormTextInput
              autoFocus
              margin="dense"
              label="Usługa"
              type="text"
              name="service"
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <FormTextInput
                autoFocus
                margin="dense"
                label="Godzina rozpoczęcia"
                type="text"
                name="time_start"
                fullWidth
              />
              <FormTextInput
                autoFocus
                margin="dense"
                label="Godzina zakończenia"
                type="text"
                name="time_end"
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
              <Button type="submit">Dodaj wizyte</Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddVisitDialog;
