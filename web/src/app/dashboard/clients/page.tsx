"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddClientForm from "src/components/client-page/add-client-form";
import Clients from "src/components/client-page/clients";

export default function ClientsPage() {
  return (
    <Box sx={{ display: "flex" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          sx={{
            borderRight: "1px solid #ccc",
          }}
        >
          <AddClientForm />
        </Grid>
        <Grid item xs={6}>
          <Clients />
        </Grid>
      </Grid>
    </Box>
  );
}
