"use client";
import { Button, Stack, Typography } from "@mui/material";
import * as React from "react";
import AddServiceDialog from "./add-service-dialog";
import { Service } from "./types";
import ServiceCard from "./service-card";


const data: Service[] = [
  {
    name: "Strzyżenie męskie",
    time: "30",
    price: "50",
  },
  {
    name: "Strzyżenie damskie",
    time: "40",
    price: "60",
  },
  {
    name: "Farbowanie krótkich włosów",
    time: "60",
    price: "100",
  },
  {
    name: "Farbowanie długich włosów",
    time: "90",
    price: "150",
  },
];

const Services: React.FunctionComponent = () => {
  const [addServiceDialogOpen, setAddServiceDialogOpen] = React.useState(false);

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
        Cennik usług
      </Typography>
      <Stack>
        {data.map((service) => (
          <ServiceCard service={service} />
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddServiceDialogOpen(true)}
        >
          Dodaj usługę
        </Button>
      </Stack>
      <AddServiceDialog
        open={addServiceDialogOpen}
        handleClose={() => setAddServiceDialogOpen(false)}
      />
    </>
  );
};

export default Services;
