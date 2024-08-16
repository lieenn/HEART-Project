import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, Box, Container } from "@mui/material";
import patientView from "../../Json files 2 patients/patientView.json";
import AdverseEventsHigh from "./AdverseEventsHigh";
import AdverseEventsLow from "./AdverseEventsLow";

/**
 * Renders patient view with their name, id, room number, and adverse events.
 * @returns {JSX.Element} - The detail page of a patient
 */
export default function DetailPage() {
  const { value } = useParams(); // Get the person's name from the URL
  const person = patientView.find((item) => item.PatientName.includes(value));

  return (
    <Container mt={5} maxWidth="xl">
      {/* Patient's general info */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          {person.PatientName}
        </Typography>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h6">PID: {person.PID}</Typography>
          <Typography variant="h6">Room # {person.roomNumber}</Typography>
        </Box>
      </Box>
      {/* Renders list of high-risk and low-risk adverse events */}
      <Box
        sx={{
          display: "flex",
          mt: 4,
          border: "3px solid #000",
        }}
      >
        {/* AdverseEventsHigh component with more space */}
        <Box sx={{ flex: 3 }}>
          <AdverseEventsHigh adverseEvents={person.adverseEvents} />
        </Box>

        {/* Vertical line border */}
        <Box sx={{ borderLeft: "3px solid #000" }} />

        {/* AdverseEventsLow component with less space */}
        <Box sx={{ flex: 2 }}>
          <AdverseEventsLow adverseEvents={person.adverseEvents} />
        </Box>
      </Box>
    </Container>
  );
}
