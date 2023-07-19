import { useState } from "react";
import "./App.css";
import { Box } from "@mui/material";
import moment from "moment-timezone";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

function App() {
  const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timeZone, setTimeZone] = useState(defaultTimezone);
  const [selectedDate, setSelectedDate] = useState(
    dayjs("2023-05-30T18:00:00.000Z", "YYYY-MM-DDTHH:mm:ss.SSS[Z]").tz(
      defaultTimezone
    )
  );
  const timezones = moment.tz.names();

  const handleTimeZoneChange = (event) => {
    const selectedTimezone = event.target.value;
    setTimeZone(selectedTimezone);
    setSelectedDate(dayjs(selectedDate).tz(selectedTimezone));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log({ timeZone, selectedDate });

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
        background: "white",
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Date From</h1>
      <Box
        component={"form"}
        sx={{
          width: 400,
          height: "auto",
          padding: "60px",
          border: "1px solid gray",
          borderRadius: "5px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
            <InputLabel id="timezone-label">Timezone</InputLabel>
            <Select
              labelId="timezone-label"
              value={timeZone}
              onChange={handleTimeZoneChange}
            >
              {timezones.map((timezone) => (
                <MenuItem key={timezone} value={timezone}>
                  {timezone}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DatePicker
            sx={{ width: "100%" }}
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            format="DD/MM/YY"
            timezone={timeZone}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
}

export default App;
