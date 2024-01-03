"use client";
import { Card, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";

interface Props {
  date: Dayjs | null;
  setDate: (date: Dayjs | null) => void;
}

const Calendar: React.FunctionComponent<Props> = ({ date, setDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
      <Card
        sx={{
          width: "min-content",
          margin: "auto",
        }}
      >
        <DateCalendar value={date} onChange={setDate} />
      </Card>
    </LocalizationProvider>
  );
};

export default Calendar;
