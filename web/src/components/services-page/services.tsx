"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import {
  UpsertServicePayload,
  _addService,
  _getAllServices,
} from "src/api/services";
import ServiceFormDialog from "./service-form-dialog";
import ServiceRow from "./service-row";

const Services: React.FunctionComponent = () => {
  const [addServiceDialogOpen, setAddServiceDialogOpen] = React.useState(false);

  const {
    data: services,
    refetch,
    isLoading,
  } = useQuery({
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
      time: parseInt(values.time),
      price: parseInt(values.price),
    });

    setAddServiceDialogOpen(false);
  };

  const servicesCount = services?.length ?? 0;

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
        Cennik usług
      </Typography>
      {servicesCount > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nazwa usługi</TableCell>
                <TableCell align="right">Czas wykonania</TableCell>
                <TableCell align="right">Cena</TableCell>
                <TableCell align="right">Edycja</TableCell>
                <TableCell align="right"></TableCell>
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
      ) : (
        <Typography>Brak dodanych usług</Typography>
      )}
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
