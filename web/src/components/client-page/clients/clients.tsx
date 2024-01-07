import { Button, Stack, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import * as React from "react";
import { Client } from "./types";
import ClientCard from "./client-card";

const data: Client[] = [
  {
    name: "Jan Kowalski",
    phone: "123456789",
    email: "jan.kowalski@gmail.com",
    address: "Maj 10, 12-345 Burak"
  },
  {
    name: "Anna Nowak",
    phone: "634123001",
    email: "anna.nowak@polsl.pl",
    address: "Maj 10, 12-345 Burak"
  },
  {
    name: "Jan Gajda",
    phone: "562100985",
    email: "jan.gajda@outlook.com",
    address: "Maj 10, 12-345 Burak"
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
