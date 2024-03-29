"use client";
import { Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
  const [addProductFormDialogOpen, setAddProductFormDialogOpen] =
    React.useState(false);

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
      quantity: parseInt(values.amount),
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
        fontWeight={300}
        sx={{
          marginBottom: "40px",
        }}
      >
        Magazyn
      </Typography>
      {productsCount > 0 ? (
        <TableContainer>
          <Table
            sx={{ minWidth: "600px" }}
            aria-label="lista-produktów"
            title="Magazyn"
          >
            <TableHead
              sx={{
                backgroundColor: "#C6A619",
              }}
            >
              <TableRow>
                <TableCell>Nazwa produktu</TableCell>
                <TableCell align="right">Ilość</TableCell>
                <TableCell align="right"></TableCell>
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
      ) : (
        <Typography>Brak dodanych produktów</Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddProductFormDialogOpen(true)}
        sx={{
          color: "white",
          fontWeight: "400",
          backgroundColor: "#C6A619",
          marginTop: "20px",
          '&:hover': {
            backgroundColor: "#857013", 
          },
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
