"use client";
import { Button, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  UpsertProductPayload,
  _addProduct,
  _getAllProducts,
} from "src/api/products";
import ProductFormDialog from "./product-form-dialog";
import ProductRow from "./product-row";

const Products: React.FunctionComponent = () => {
  const [addProductFormDialogOpen, setAddProductFormDialogOpen] = React.useState(false);

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => _getAllProducts(),
  });

  const { mutateAsync: addProduct } = useMutation({
    mutationFn: (product: UpsertProductPayload) => _addProduct(product),
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async (values: any) => {
    await addProduct({
      name: values.name,
      amount: values.amount,
      description: values.description,
    });

    setAddProductFormDialogOpen(false);
  };

  function createData(
    name: string,
    amount: number
  ){
    return { name, amount}
  }

  return (
    <>
      <Typography>Magazyn</Typography>
      <TableContainer>
        <Table
        sx={{minWidth: 650}} aria-label="lista-produktów" title="Magazyn"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nazwa</TableCell>
              <TableCell align="right">Ilość</TableCell>
              <TableCell align="right">Edytuj</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {products?.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                allProducts={products ?? []}
                refetch={refetch}
              />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddProductFormDialogOpen(true)}
        >
          Dodaj produkt
        </Button>

      <ProductFormDialog
        products={products ?? []}
        onSubmit={handleSubmit}
        open={addProductFormDialogOpen}
        handleClose={() => setAddProductFormDialogOpen(false)}
        title="Dodawanie produktu"
        description="Wypełnij formularz aby dodać produkt"
        submitButtonLabel="Dodaj produkt"
      />
    </>
  );
};

export default Products;
