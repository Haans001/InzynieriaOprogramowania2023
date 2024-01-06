import { Button, Card, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { UpsertVisitPayload, Visit, _updateVisit } from "src/api/visits";
import { getVisitHours } from "./form";
import VisitFormDialog from "./visit-form-dialog";

interface Props {
  visit: Visit;
  allVisits: Visit[];
  date: string;
  refetch: () => Promise<unknown>;
}

const VisitCard: React.FunctionComponent<Props> = ({
  visit,
  allVisits,
  date,
  refetch,
}) => {
  const [editVisitDialogOpen, setEditVisitDialogOpen] =
    useState<boolean>(false);

  const { mutateAsync: updateVisit } = useMutation({
    mutationFn: (values: UpsertVisitPayload) => _updateVisit(values, visit.id),
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async (values: any) => {
    const { visitTimeStart, visitTimeEnd } = getVisitHours(
      date,
      values.time_start,
      values.time_end,
    );

    await updateVisit({
      client_id: values.client_id,
      note: values.note,
      time_end: visitTimeEnd.toISOString(),
      time_start: visitTimeStart.toISOString(),
    });

    setEditVisitDialogOpen(false);
  };

  return (
    <Card
      sx={{
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h6" component="h6" fontWeight={700}>
        {visit.user.first_name} {visit.user.last_name}
      </Typography>
      <Typography variant="body1" component="p">
        {dayjs(visit.time_start).format("HH:mm")} -{" "}
        {dayjs(visit.time_end).format("HH:mm")}
      </Typography>
      <Typography variant="body1" component="p">
        {visit.note}
      </Typography>
      <Typography variant="body1" component="p">
        {visit.user.phone}
      </Typography>
      <Typography variant="body1" component="p">
        {visit.user.email}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEditVisitDialogOpen(true)}
        >
          Edytuj
        </Button>
        <Button variant="contained" color="error">
          Usuń
        </Button>
      </Stack>
      <VisitFormDialog
        date={date}
        open={editVisitDialogOpen}
        handleClose={() => setEditVisitDialogOpen(false)}
        visit={visit}
        visits={allVisits}
        onSubmit={handleSubmit}
        title="Edytuj wizytę"
        description="Wypełnij formularz aby edytować wizytę"
        submitButtonLabel="Zapisz"
      />
    </Card>
  );
};
export default VisitCard;
