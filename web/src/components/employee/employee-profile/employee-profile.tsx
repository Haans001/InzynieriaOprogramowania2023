"use client";
import { Chip, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { _getEmployeeVisits } from "src/api/visits";
import ProfileVisitCard from "src/components/shared/profile-visit-card";
import { useAuth } from "src/providers/auth-provider";

const EmployeeProfile: React.FunctionComponent = () => {
  const { employee, isAdmin } = useAuth();

  const { data } = useQuery({
    queryKey: ["employee_visits", employee?.id],
    queryFn: () => _getEmployeeVisits(employee?.id!),
  });

  console.log(data);

  return (
    <div>
      <Typography variant="h4">
        {employee?.first_name} {employee?.last_name}
        <Chip
          sx={{
            marginLeft: "10px",
          }}
          size="small"
          label={isAdmin ? "Administrator" : "Pracownik"}
          color={isAdmin ? "error" : "success"}
        />
      </Typography>
      <Stack
        sx={{
          marginTop: "20px",
        }}
      >
        <Typography variant="body1" component="p">
          Nazwa uzytkownika :{" "}
          <Typography variant="body1" component="b" fontWeight={600}>
            {employee?.username}
          </Typography>
        </Typography>
        <Typography variant="body1" component="p">
          Email :{" "}
          <Typography variant="body1" component="b" fontWeight={600}>
            {employee?.email}
          </Typography>
        </Typography>
      </Stack>
      <Typography
        sx={{
          marginTop: "30px",
        }}
        variant="h5"
      >
        Wizyty
      </Typography>
      <Stack
        sx={{
          marginTop: "20px",
        }}
      >
        {data?.map((visit) => (
          <ProfileVisitCard visit={visit}>
            <Typography variant="body1" component="p">
              Klient :{" "}
              <Typography variant="body1" component="b" fontWeight={600}>
                {visit.user.first_name} {visit.user.last_name}
              </Typography>
            </Typography>
          </ProfileVisitCard>
        ))}
      </Stack>
    </div>
  );
};

export default EmployeeProfile;
