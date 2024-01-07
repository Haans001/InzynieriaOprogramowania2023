"use client";
import { Button, Stack, Typography } from "@mui/material";
import * as React from "react";
import AddProductDialog from "./add-product-dialog";
import ProductCard from "./product-card";
import { Product } from "./types";


const data: Product[] = [
  {
    name: "Nożyczki",
    amount: 3,
    description: "",
  },
  {
    name: "Grzebień",
    amount: 5,
    description: "",
  },
  {
    name: "Farba czarna",
    amount: 4,
    description: "",
  },
  {
    name: "Rozjaśniacz",
    amount: 1,
    description: "Rozjaśniacz Loreal 100 ml",
  },
];

const Products: React.FunctionComponent = () => {
  const [addProductDialogOpen, setAddProductDialogOpen] = React.useState(false);

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
        {data.map((product) => (
          <ProductCard product={product} />
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddProductDialogOpen(true)}
        >
          Dodaj zasób
        </Button>
      </Stack>
      <AddProductDialog
        open={addProductDialogOpen}
        handleClose={() => setAddProductDialogOpen(false)}
      />
    </>
  );
};

export default Products;
