import { Stack, Typography } from "@mui/material";
import * as React from "react";
import ClientCard from "./client-card";
import { Client } from "./types";

const data: Client[] = [
  {
    name: "Jan Kowalski",
    phone: "123456789",
    email: "jan.kowalski@gmail.com",
  },
  {
    name: "Anna Nowak",
    phone: "634123001",
    email: "anna.nowak@polsl.pl",
  },
  {
    name: "Jan Gajda",
    phone: "562100985",
    email: "jan.gajda@outlook.com",
  },
];

const Clients: React.FunctionComponent = () => {
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
        {data.map((client) => (
          <ClientCard client={client} />
        ))}
      </Stack>
    </>
  );
};

export default Clients;
