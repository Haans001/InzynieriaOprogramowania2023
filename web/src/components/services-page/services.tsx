"use client";
import { Button, Stack, TableContainer, Typography, Table, TableCell, TableRow, TableHead, TableBody } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import ServiceFormDialog from "./service-form-dialog";
import {
  UpsertServicePayload,
  _addService,
  _getAllServices,
} from "src/api/services";
import ServiceRow from "./service-row";

const Services: React.FunctionComponent = () => {
  const [addServiceDialogOpen, setAddServiceDialogOpen] = React.useState(false);

  const { data: services, refetch } = useQuery({
    queryKey: ["services"],
    queryFn: () => _getAllServices(),
  });

  const { mutateAsync: addService } = useMutation({
    mutationFn: (service: UpsertServicePayload) => _addService(service),
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async (values: any) => {
    await addService({
      name: values.name,
      time: values.time,
      price: values.price,
      description: values.description,
    });

    setAddServiceDialogOpen(false);
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
        Cennik usług
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nazwa usługi</TableCell>
              <TableCell align="right">Czas wykonania</TableCell>
              <TableCell align="right">Cena</TableCell>
              <TableCell align="right">Edycja</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {services?.map((service) => (
          <ServiceRow 
            key={service.id}
            service={service} 
            allServices={services ?? []}
            refetch={refetch}
          />
        ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddServiceDialogOpen(true)}
        sx={{
          marginTop: "20px",
        }}
      >
        Dodaj usługę
      </Button>
      <ServiceFormDialog
        services={services ?? []}
        onSubmit={handleSubmit}
        open={addServiceDialogOpen}
        handleClose={() => setAddServiceDialogOpen(false)}
        title="Dodawanie usługi"
        description="Wypełnij formularz aby dodać usługę"
        submitButtonLabel="Dodaj usługę"
      />
    </>
  );
};

export default Services;
