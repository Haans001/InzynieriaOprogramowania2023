"use client";

import { Card, Chip, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Visit } from "src/api/visits";

interface Props {
  visit: Visit;
  children?: React.ReactNode;
}

const ProfileVisitCard: React.FunctionComponent<Props> = ({
  visit,
  children,
}) => {
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

      {children}
    </Card>
  );
};

export default ProfileVisitCard;
