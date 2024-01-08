"use client";
import { Button, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import {
  UpsertProductPayload,
  _addProduct,
  _getAllProducts,
} from "src/api/products";
import ProductFormDialog from "./product-form-dialog";
import ProductCard from "./product-card";

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
        Lista zasobów
      </Typography>
      <Stack>
        {products?.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            allProducts={products ?? []}
            refetch={refetch}
          />
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddProductFormDialogOpen(true)}
        >
          Dodaj produkt
        </Button>
      </Stack>
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
