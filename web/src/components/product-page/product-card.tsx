import { Card, Typography } from "@mui/material";
import { Button, Stack } from "@mui/material";
import * as React from "react";
import FormTextInput from "src/components/shared/form/form-text-input";
import { Form, Formik } from "formik";
import { Product } from "./types";
import EditProductDialog from "./edit-product-dialog"
interface Props {
    product: Product;
}

const ProductCard: React.FunctionComponent<Props> = ({ product }) => {
  const [editProductDialogOpen, setEditProductDialogOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(product);
  console.log(product);
  return (
    <>
    <Card
      key={product.name}
      sx={{
        padding: "20px",
        marginBottom: "20px",
        width: "600px",
      }}
    >
      <Typography variant="h6" component="h6" fontWeight={700}>
        {product.name}
      </Typography>
      <Typography variant="body1" component="p">
      <Formik
          onSubmit={console.log}
          initialValues={{
            amount: product.amount,
          }}
        >
          <Form>
          <Stack direction="row" spacing={2}>
            <FormTextInput
              autoFocus
              margin="dense"
              type="number"
              name="amount"     
              sx={{ width: "50px" }}       
            />
              <Button type="submit">
                  Zatwierdź ilość
              </Button>
          </Stack>
              <Button
              variant="contained"
              color="primary"
              onClick={() => {setSelectedProduct(product); setEditProductDialogOpen(true)}}
              >
                Edytuj produkt
              </Button>
          </Form>
        </Formik>
      </Typography>
    </Card>
    <EditProductDialog
    open={editProductDialogOpen}
    handleClose={() => {setEditProductDialogOpen(false)}}
    product={selectedProduct}
    />
    </>
  );
};
export default ProductCard;
