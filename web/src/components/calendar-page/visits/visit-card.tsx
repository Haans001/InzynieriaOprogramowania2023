import LaunchIcon from "@mui/icons-material/Launch";
import { Button, Card, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import {
  UpsertVisitPayload,
  Visit,
  _deleteVisit,
  _updateVisit,
} from "src/api/visits";
import DeleteModal from "src/components/shared/delete-dialog";
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

  const [deleteVisitDialogOpen, setDeleteVisitDialogOpen] =
    useState<boolean>(false);

  const { mutateAsync: updateVisit } = useMutation({
    mutationFn: (values: UpsertVisitPayload) => _updateVisit(values, visit.id),
    onSuccess: () => {
      refetch();
    },
  });

  const { mutateAsync: deleteVisit } = useMutation({
    mutationFn: () => _deleteVisit(visit.id),
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
      note: values.note,
      time_end: visitTimeEnd.toISOString(),
      time_start: visitTimeStart.toISOString(),
      service_id: parseInt(values.service_id),
      client_id: parseInt(values.client_id),
    });

    setEditVisitDialogOpen(false);
  };

  const isVisitDone = new Date(visit.time_end) < new Date();

  const fullName = `${visit.user.first_name} ${visit.user.last_name}`;

  return (
    <Card
      sx={{
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Link href={`clients/profile/${visit.user.id}`}>
        <Stack direction="row" alignItems={"center"}>
          <Typography variant="h6" component="h6" fontWeight={700}>
            {fullName}
          </Typography>
          <LaunchIcon />
        </Stack>
      </Link>
      <Typography variant="body1" component="p">
        {dayjs(visit.time_start).format("HH:mm")} -{" "}
        {dayjs(visit.time_end).format("HH:mm")}
      </Typography>
      <Typography variant="body1" component="p" fontWeight={700}>
        Usługa:{" "}
        <Typography variant="body1" component="span">
          {visit.service.name} ({visit.service.price}zł)
        </Typography>
      </Typography>
      <Typography variant="body1" component="p" fontWeight={700}>
        Notatka:{" "}
        <Typography variant="body1" component="span">
          {visit.note}
        </Typography>
      </Typography>
      {!isVisitDone ? (
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
          <Button
            variant="contained"
            color="error"
            onClick={() => setDeleteVisitDialogOpen(true)}
          >
            Usuń
          </Button>
        </Stack>
      ) : null}
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
      <DeleteModal
        title="Usuń Wizytę"
        description={`Czy napewno chcesz usunąć wizytę dla ${fullName} dnia ${date} o godzinie ${dayjs(
          visit.time_start,
        ).format("HH:mm")}?`}
        open={deleteVisitDialogOpen}
        onClose={() => setDeleteVisitDialogOpen(false)}
        onConfirm={() => deleteVisit()}
      />
    </Card>
  );
};
export default VisitCard;
