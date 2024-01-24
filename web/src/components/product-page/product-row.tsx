import { Button, TableCell, TableRow } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { VscEdit } from "react-icons/vsc";
import {
  Product,
  UpsertProductPayload,
  _updateProduct,
} from "src/api/products";
import ProductFormDialog from "./product-form-dialog";
interface Props {
  product: Product;
  allProducts: Product[];
  refetch: () => Promise<unknown>;
}

const ProductRow: React.FunctionComponent<Props> = ({
  product,
  allProducts,
  refetch,
}) => {
  const [editProductDialogOpen, setEditProductDialogOpen] =
    React.useState<boolean>(false);

  const { mutateAsync: updateProduct } = useMutation({
    mutationFn: (values: UpsertProductPayload) =>
      _updateProduct(values, product.id),
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async (values: any) => {
    await updateProduct({
      name: values.name,
      quantity: values.quantity,
      description: values.description,
    });

    setEditProductDialogOpen(false);
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {product.name}
        </TableCell>
        <TableCell align="right">{product.quantity}</TableCell>
        <TableCell align="right">
          <Button
          sx={{
            color: "#C6A619",
            '&:hover': {
              color: "#FCF9EC",
              backgroundColor: "#C6A619", 
            },
          }}
            onClick={() => {
              setEditProductDialogOpen(true);
            }}
          >
            <VscEdit />
          </Button>
        </TableCell>
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
      </TableRow>
    </>
  );
};
export default ProductRow;
