import { Button, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Form, Formik } from "formik";
import FormSelectInput from "src/components/shared/form/form-select-input";
import FormTextInput from "src/components/shared/form/form-text-input";
import FormTimePickerInput from "src/components/shared/form/form-time-picker-input";
import { ZIndex } from "src/utils/zIndex";

interface Props {
  open: boolean;
  handleClose: () => void;
  date: string;
}

const AddVisitDialog: React.FC<Props> = ({ open, handleClose, date }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        disableEscapeKeyDown
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
            onSubmit={(values) => {
              console.log(JSON.stringify(values, null, 2));
            }}
            initialValues={{
              time_start: "",
              time_end: "",
              note: "",
              serviceId: null,
              clientId: null,
            }}
          >
            <Form>
              <Stack direction="column" spacing={2}>
                <FormSelectInput
                  name="serviceId"
                  label="Usługa"
                  options={[
                    {
                      label: "Strzyżenie",
                      value: 1,
                    },
                    {
                      label: "Farbowanie",
                      value: 2,
                    },
                  ]}
                />
                <FormSelectInput
                  name="clientId"
                  label="Klient"
                  options={[
                    {
                      label: "Jan Rapacz",
                      value: 1,
                    },
                    {
                      label: "Żaneta Hoffman",
                      value: 2,
                    },
                  ]}
                />
                <Stack direction="row" spacing={2}>
                  <FormTimePickerInput
                    autoFocus
                    label="Godzina rozpoczęcia"
                    name="time_start"
                  />
                  <FormTimePickerInput
                    autoFocus
                    label="Godzina zakończenia"
                    name="time_end"
                  />
                </Stack>
              </Stack>
              <FormTextInput
                autoFocus
                margin="dense"
                label="Notatka"
                type="text"
                name="note"
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
                <Button type="submit">Dodaj wizyte</Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AddVisitDialog;
