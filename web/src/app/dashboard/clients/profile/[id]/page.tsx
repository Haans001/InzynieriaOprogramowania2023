"use client";

import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { _getClient } from "src/api/client";
import ProfileVisitCard from "src/components/shared/profile-visit-card";

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
        <ProfileVisitCard visit={visit}>
          <Typography variant="body1" component="p">
            Fryzjer:{" "}
            <Typography variant="body1" component="b" fontWeight={600}>
              {visit.Employee.first_name} {visit.Employee.last_name}
            </Typography>
          </Typography>
        </ProfileVisitCard>
      ))}
    </div>
  );
};

export default ClientProfile;
