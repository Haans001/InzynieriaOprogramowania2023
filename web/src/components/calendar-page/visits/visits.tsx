import { Button, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import * as React from "react";
import {
  UpsertVisitPayload,
  _addVisit,
  _getVisitsForDay,
} from "src/api/visits";
import { getVisitHours } from "./form";
import VisitCard from "./visit-card";
import AddVisitDialog from "./visit-form-dialog";

interface Props {
  date: Dayjs | null;
}

const Visits: React.FunctionComponent<Props> = ({ date }) => {
  const [addVisitDialogOpen, setAddVisitDialogOpen] = React.useState(false);

  const day = date?.format("YYYY-MM-DD") || "";

  const { data: visits, refetch } = useQuery({
    queryKey: ["visits", day],
    queryFn: () => _getVisitsForDay(day || ""),
  });

  const { mutateAsync: addVisit } = useMutation({
    mutationFn: (visit: UpsertVisitPayload) => _addVisit(visit),
    onSuccess: () => {
      refetch();
    },
  });

  const isDayFromPast = date?.isBefore(new Date(), "day");

  const handleSubmit = async (values: any) => {
    const { visitTimeStart, visitTimeEnd } = getVisitHours(
      day,
      values.time_start,
      values.time_end,
    );

    await addVisit({
      note: values.note,
      time_end: visitTimeEnd.toISOString(),
      time_start: visitTimeStart.toISOString(),
      service_id: parseInt(values.service_id),
      client_id: parseInt(values.client_id),
    });

    setAddVisitDialogOpen(false);
  };

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
        Wizyty dnia {day}
      </Typography>
      <Stack>
        {visits?.length === 0 && (
          <Typography
            variant="body1"
            component="p"
            sx={{
              marginBottom: "20px",
            }}
          >
            Brak wizyt na ten dzień
          </Typography>
        )}
        {visits?.map((visit) => (
          <VisitCard
            key={visit.id}
            visit={visit}
            allVisits={visits ?? []}
            date={day}
            refetch={refetch}
          />
        ))}
        {!isDayFromPast && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddVisitDialogOpen(true)}
          >
            Dodaj wizytę
          </Button>
        )}
      </Stack>
      <AddVisitDialog
        visits={visits ?? []}
        onSubmit={handleSubmit}
        date={date?.format("YYYY-MM-DD") || ""}
        open={addVisitDialogOpen}
        handleClose={() => setAddVisitDialogOpen(false)}
        title="Dodaj wizytę"
        description={`Dodaj wizytę do kalendarza ${day}`}
        submitButtonLabel="Dodaj wizytę"
      />
    </>
  );
};

export default Visits;
