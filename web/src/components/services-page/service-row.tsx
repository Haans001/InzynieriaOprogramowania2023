import { Button, TableCell, TableRow } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { VscEdit } from "react-icons/vsc";
import {
  Service,
  UpsertServicePayload,
  _updateService,
} from "src/api/services";
import ServiceFormDialog from "./service-form-dialog";

interface Props {
  service: Service;
  allServices: Service[];
  refetch: () => Promise<unknown>;
}

const ServiceRow: React.FunctionComponent<Props> = ({
  service,
  allServices,
  refetch,
}) => {
  const [editServiceFormDialogOpen, setEditServiceFormDialogOpen] =
    React.useState(false);

  const { mutateAsync: updateService } = useMutation({
    mutationFn: (values: UpsertServicePayload) =>
      _updateService(values, service.id),
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async (values: any) => {
    await updateService({
      name: values.name,
      time: parseInt(values.time),
      price: parseInt(values.price),
    });
    setEditServiceFormDialogOpen(false);
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {service.name}
        </TableCell>

        <TableCell align="right">{`${service.time} min`}</TableCell>

        <TableCell align="right">{`${service.price} zł`}</TableCell>

        <TableCell align="right">
          <Button
            color="secondary"
            onClick={() => {
              setEditServiceFormDialogOpen(true);
            }}
          >
            <VscEdit />
          </Button>
        </TableCell>
      </TableRow>
      <ServiceFormDialog
        open={editServiceFormDialogOpen}
        handleClose={() => setEditServiceFormDialogOpen(false)}
        services={allServices}
        service={service}
        onSubmit={handleSubmit}
        title="Edytuj usługę"
        description="Zmień wybrane pola aby edytować produkt"
        submitButtonLabel="Zapisz"
      />
    </>
  );
};
export default ServiceRow;
