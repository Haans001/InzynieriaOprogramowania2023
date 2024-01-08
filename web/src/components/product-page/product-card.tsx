import { Card, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Button, Stack } from "@mui/material";
import * as React from "react";
import { UpsertProductPayload, Product, _updateProduct } from "src/api/products";
import FormTextInput from "src/components/shared/form/form-text-input";
import { Form, Formik } from "formik";
import ProductFormDialog from "./product-form-dialog";

interface Props {
    product: Product;
    allProducts: Product[];
    refetch: () => Promise<unknown>;
}

const ProductCard: React.FunctionComponent<Props> = ({ 
  product,
  allProducts,
  refetch, 
}) => {
  const [editProductDialogOpen, setEditProductDialogOpen] = React.useState<boolean>(false);

  const { mutateAsync: updateProduct } = useMutation({
    mutationFn: (values: UpsertProductPayload) => _updateProduct(values, product.id),
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async (values: any) => {
    await updateProduct({
      name: values.name,
      amount: values.amount,
      description: values.description,
    });

    setEditProductDialogOpen(false);
  };

  return (
    <>
    <Card
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
              onClick={() => {setEditProductDialogOpen(true)}}
              >
                Edytuj
              </Button>
          </Form>
        </Formik>
      </Typography>
    </Card>
    <ProductFormDialog
        open={editProductDialogOpen}
        handleClose={() => setEditProductDialogOpen(false)}
        product={product}
        products={allProducts}
        onSubmit={handleSubmit}
        title="Edytuj produkt"
        description="Wypełnij formularz aby edytować produkt"
        submitButtonLabel="Zapisz"
      />
    </>
  );
};
export default ProductCard;
