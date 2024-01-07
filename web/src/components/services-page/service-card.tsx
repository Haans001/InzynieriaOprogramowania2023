import { Card, Typography } from "@mui/material";
import { Service } from "./types";
import { Button } from "@mui/material";
import * as React from "react";
import EditServiceDialog from "./edit-service-dialog";

interface Props {
  service: Service;
}

const ServiceCard: React.FunctionComponent<Props> = ({ service }) => {
  const [editServiceDialogOpen, setEditServiceDialogOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(service);
  console.log(service);
  return (
    <>
    <Card
      key={service.name}
      sx={{
        padding: "20px",
        marginBottom: "20px",
        width: "600px",
      }}
    >
      <Typography variant="h6" component="h6" fontWeight={700}>
        {service.name}
      </Typography>
      <Typography variant="body1" component="p">
      {`${service.time} min`}
      </Typography>
      <Typography variant="body1" component="p">
        {`${service.price} zł`}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {setSelectedService(service); setEditServiceDialogOpen(true)}}
      >
        Edytuj usługę
      </Button>
    </Card>
    <EditServiceDialog
    open={editServiceDialogOpen}
    handleClose={() => setEditServiceDialogOpen(false)}
    service={selectedService}
    />
    </>
  );
};
export default ServiceCard;
