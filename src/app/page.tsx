"use client";
import Calendar from "@/components/calendar-page/calendar";
import Visits from "@/components/calendar-page/visits";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";

export default function HomePage() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());

  console.log(date?.format("YYYY-MM-DD"));

  return (
    <Box sx={{ display: "flex" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          sx={{
            borderRight: "1px solid #ccc",
          }}
        >
          <Calendar date={date} setDate={setDate} />
        </Grid>
        <Grid item xs={6}>
          <Visits date={date} />
        </Grid>
      </Grid>
    </Box>
  );
}
