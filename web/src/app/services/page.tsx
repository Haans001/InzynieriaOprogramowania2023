import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Services from "src/components/services-page/services";

export default function EmployeesPage() {
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
        <Services />
      </Box>
    </Container>
  );
}
