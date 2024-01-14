"use client";

import { Card, Chip, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { _getClient } from "src/api/client";
import { Visit } from "src/api/visits";

interface Props {
  visit: Visit;
}

const VisitCard: React.FunctionComponent<Props> = ({ visit }) => {
  const isVisitDone = new Date(visit.time_end) < new Date();

  return (
    <Card
      key={visit.id}
      sx={{
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Stack direction="row" spacing={1} alignItems={"center"}>
        <Typography variant="h6" component="h6" fontWeight={700}>
          {visit.note}
        </Typography>
        <Chip
          size="small"
          label={isVisitDone ? "Zakończona" : "Oczekująca"}
          color={isVisitDone ? "success" : "warning"}
        />
      </Stack>
      <Typography variant="body1" component="p">
        Data wizyty:{" "}
        <Typography variant="body1" component="b" fontWeight={600}>
          {dayjs(visit.time_start).format("DD-MM-YYYY")}
        </Typography>
      </Typography>
      <Typography variant="body1" component="p">
        Data zapisu:{" "}
        <Typography variant="body1" component="b" fontWeight={600}>
          {dayjs(visit.createdAt).format("DD-MM-YYYY")}
        </Typography>
      </Typography>
    </Card>
  );
};

const ClientProfile = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["client", id],
    queryFn: () => _getClient(+id),
  });

  const fullname = `${data?.first_name} ${data?.last_name}`;

  const information = [
    {
      label: "Email",
      value: data?.email,
    },
    {
      label: "Telefon",
      value: data?.phone,
    },
    {
      label: "Adres",
      value: data?.address,
    },
  ];

  console.log(data?.Visit);

  if (isLoading) return null;

  const visits = (data?.Visit ?? []).sort((a, b) => {
    return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
  });

  return (
    <div>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          marginBottom: "20px",
        }}
      >
        Profil Klienta: {fullname}
      </Typography>
      <Stack direction="column">
        {information.map((info) => (
          <Typography variant="body1" component="p">
            {info.label}:
            <Typography
              variant="body1"
              component="b"
              fontWeight={600}
              sx={{
                marginLeft: "10px",
              }}
            >
              {info.value}
            </Typography>
          </Typography>
        ))}
      </Stack>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Historia Wizyt
      </Typography>
      {visits.map((visit) => (
        <VisitCard visit={visit} />
      ))}
    </div>
  );
};

export default ClientProfile;
