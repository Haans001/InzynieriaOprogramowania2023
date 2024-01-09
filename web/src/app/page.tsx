"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import dayjs, { Dayjs } from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import Calendar from "src/components/calendar-page/calendar";
import Visits from "src/components/calendar-page/visits";

export default function HomePage() {
  const searchParams = useSearchParams();

  const [date, setDate] = React.useState<Dayjs | null>(
    dayjs(searchParams.get("date")),
  );
  const router = useRouter();
  const pathname = usePathname();

  const handleDateChange = (date: Dayjs | null) => {
    const params = new URLSearchParams({
      date: date?.toISOString() || "",
    });

    const url = `${pathname}?${params.toString()}`;

    router.push(url);

    setDate(date);
  };

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
          <Calendar date={date} setDate={handleDateChange} />
        </Grid>
        <Grid item xs={6}>
          <Visits date={date} />
        </Grid>
      </Grid>
    </Box>
  );
}
