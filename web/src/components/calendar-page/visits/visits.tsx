import { Button, Stack, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import * as React from "react";
import AddVisitDialog from "./add-visit-dialog";
import { Visit } from "./types";
import VisitCard from "./visit-card";

interface Props {
  date: Dayjs | null;
}

const data: Visit[] = [
  {
    name: "Jan Kowalski",
    time_start: "10:00",
    time_end: "11:00",
    service: "Strzyżenie",
    phone: "123456789",
    email: "jan.kowalski@gmail.com",
  },
  {
    name: "Anna Nowak",
    time_start: "11:00",
    time_end: "13:30",
    service: "Farbowanie",
    phone: "634123001",
    email: "anna.nowak@polsl.pl",
  },
  {
    name: "Jan Gajda",
    time_start: "14:00",
    time_end: "15:00",
    service: "Strzyżenie",
    phone: "562100985",
    email: "jan.gajda@outlook.com",
  },
];

const Visits: React.FunctionComponent<Props> = ({ date }) => {
  const [addVisitDialogOpen, setAddVisitDialogOpen] = React.useState(false);

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
        Wybierz dzień aby zobaczyć wizyty
      </Typography>
      <Stack>
        {data.map((visit) => (
          <VisitCard visit={visit} />
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddVisitDialogOpen(true)}
        >
          Dodaj wizytę
        </Button>
      </Stack>
      <AddVisitDialog
        date={date?.format("YYYY-MM-DD") || ""}
        open={addVisitDialogOpen}
        handleClose={() => setAddVisitDialogOpen(false)}
      />
    </>
  );
};

export default Visits;
