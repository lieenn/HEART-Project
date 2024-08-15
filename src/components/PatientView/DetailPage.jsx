import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, Box, Container } from "@mui/material";
import patientView from "../../Json files 2 patients/patientView.json";
import AdverseEventsHigh from "./AdverseEventsHigh";
import AdverseEventsLow from "./AdverseEventsLow";

export default function DetailPage() {
  const { value } = useParams(); // Get the person's name from the URL
  console.log(value);
  // Find the person based on PatientName
  const person = patientView.find((item) => item.PatientName.includes(value));
  console.log(person);

  if (!person) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          No Details Found
        </Typography>
        <Link to="/">
          <Button variant="contained">Back</Button>
        </Link>
      </Box>
    );
  }

  return (
    <Container mt={5} maxWidth="xl">
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
      {/* Flex container with different widths for left and right sides */}
      <Box
        sx={{
          display: "flex",
          mt: 4,
          border: "3px solid #000",
        }}
      >
        {/* AdverseEvents component with more space */}
        <Box sx={{ flex: 3 }}>
          <AdverseEventsHigh adverseEvents={person.adverseEvents} />
        </Box>

        {/* Vertical line border */}
        <Box sx={{ borderLeft: "3px solid #000" }} />

        {/* AdverseEventsLow component with less space */}
        <Box sx={{ flex: 1.5 }}>
          <AdverseEventsLow adverseEvents={person.adverseEvents} />
        </Box>
      </Box>
    </Container>
  );
}
