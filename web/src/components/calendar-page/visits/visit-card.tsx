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
import { red } from "@mui/material/colors";
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
      employee_id: parseInt(values.employee_id),
    });

    setEditVisitDialogOpen(false);
  };

  const isVisitDone = new Date(visit.time_end) < new Date();

  const fullName = `${visit.user.first_name} ${visit.user.last_name}`;

  const employeeFullName = `${visit.Employee.first_name} ${visit.Employee.last_name}`;

  return (
    <Card
      sx={{
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Link href={`dashboard/clients/profile/${visit.user.id}`} style={{textDecorationLine: "none", color:"black"}}>
          <Stack direction="row" alignItems={"center"}>
            <Typography variant="h6" component="h6" fontWeight={700}>
              {fullName}
            </Typography>
          </Stack>
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
        <Typography variant="body1" component="p" fontWeight={700}>
          Fryzjer :{" "}
          <Typography variant="body1" component="span">
            {employeeFullName}
          </Typography>
        </Typography>
        <Typography align="right">    
        <LaunchIcon />
        </Typography>
      </Link>
      {!isVisitDone ? (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            marginTop: "20px",
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "#C6A619",
              marginTop: "20px",
              '&:hover': {
                color: "white",
                backgroundColor: "#C6A619", 
                borderColor: "#C6A619",
              },
            }}
            onClick={() => setEditVisitDialogOpen(true)}
          >
            Edytuj
          </Button>
          <Button
            variant="text"
            sx={{
              color: "#B32222",
              marginTop: "20px",
              '&:hover': {
                color: "white",
                backgroundColor: "red", 
                borderColor: "red",
              },
            }}
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
