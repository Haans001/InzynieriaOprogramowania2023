import FormTextInput from "src/components/shared/form/form-text-input";
import { ZIndex } from "src/utils/zIndex";
import { Button, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddProductDialog: React.FC<Props> = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        zIndex: ZIndex.DIALOG,
      }}
    >
      <DialogTitle>Dodawanie produktu</DialogTitle>
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
          Wypełnij poniższe pola aby dodać produkt
        </DialogContentText>
        <Formik
          onSubmit={console.log}
          initialValues={{
            name: "",
            amount: 0,
            description: "",
          }}
        >
          <Form>
            <FormTextInput
              autoFocus
              margin="dense"
              label="Nazwa produktu"
              type="text"
              name="name"
              fullWidth
            />
            <FormTextInput
              autoFocus
              margin="dense"
              label="Ilość"
              type="number"
              name="amount"
              fullWidth
            />
            <FormTextInput
              autoFocus
              margin="dense"
              label="Opis"
              type="text"
              name="description"
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
              <Button type="submit">Dodaj zasób</Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
