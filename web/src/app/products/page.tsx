import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Products from "src/components/product-page/products";

export default function ProductPage() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Products />
      </Box>
    </Container>
  );
}
