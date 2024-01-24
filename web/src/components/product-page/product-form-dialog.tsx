import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import { Product } from "src/api/products";
import FormTextInput from "src/components/shared/form/form-text-input";
import { ZIndex } from "src/utils/zIndex";
import { getInitialValues, validationSchema } from "./form";

interface Props {
  open: boolean;
  handleClose: () => void;
  products: Product[];
  product?: Product;
  onSubmit: (values: any) => Promise<void>;
  title: string;
  description: string;
  submitButtonLabel: string;
}

const ProductFormDialog: React.FC<Props> = ({
  open,
  handleClose,
  onSubmit,
  product,
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
          initialValues={getInitialValues(product ?? ({} as Product))}
        >
          <Form>
            <FormTextInput
              margin="dense"
              label="Nazwa produktu"
              type="text"
              name="name"
              fullWidth
            />
            <FormTextInput
              margin="dense"
              label="Ilość"
              type="number"
              name="amount"
              fullWidth
            />
            <FormTextInput
              margin="dense"
              label="Opis"
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
              <Button 
                onClick={handleClose} 
                type="button"
                variant="text"
                sx={{
                  color: "#B32222",
                  marginTop: "20px",
                  '&:hover': {
                    color: "white",
                    backgroundColor: "#B32222", 
                  },
                }}
                >
                Odrzuć
              </Button>
              <Button 
                type="submit"
                variant="text"
                sx={{
                  color: "#C6A619",
                  marginTop: "20px",
                  '&:hover': {
                    color: "white",
                    backgroundColor: "#167014", 
                  },
                }}
              >{submitButtonLabel}</Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
