"use client";
import { 
  Button, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography 
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import {
  UpsertProductPayload,
  _addProduct,
  _getAllProducts,
} from "src/api/products";
import ProductFormDialog from "./product-form-dialog";
import ProductRow from "./product-row";

const Products: React.FunctionComponent = () => {
  const [addProductFormDialogOpen, setAddProductFormDialogOpen] = React.useState(false);

  const { 
    data: products, 
    refetch, 
    isLoading, 
  } = useQuery({
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
      amount: parseInt(values.amount),
      description: values.description,
    });

    setAddProductFormDialogOpen(false);
  };

  const productsCount = products?.length ?? 0;

  if (isLoading) {
    return <Typography>Ładowanie...</Typography>;
  }

  return (
    <>
      <Typography 
        variant="h5"
        component="h5"
        fontWeight={700}
        sx={{
          marginBottom: "40px",
        }}
      >
        Magazyn
      </Typography>
      {productsCount > 0 ? (
        <TableContainer>
          <Table
          sx={{minWidth: "600px"}} aria-label="lista-produktów" title="Magazyn"
          >
            <TableHead>
              <TableRow>
                <TableCell>Nazwa produktu</TableCell>
                <TableCell align="right">Ilość</TableCell>
                <TableCell align="right">Edycja</TableCell>
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
        </TableContainer>) : (
          <Typography>Brak dodanych produktów</Typography>
        )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddProductFormDialogOpen(true)}
        sx={{
          marginTop: "20px",
        }}
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
