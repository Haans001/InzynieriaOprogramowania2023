import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { _getAllClients } from "src/api/client";
import ClientCard from "./client-card";

const Clients: React.FunctionComponent = () => {
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => _getAllClients(),
  });

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
        Lista klientów
      </Typography>
      <Stack>
        {clients?.map((client) => (
          <ClientCard client={client} />
        ))}
      </Stack>
    </>
  );
};

export default Clients;
