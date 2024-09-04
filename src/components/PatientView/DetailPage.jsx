import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, Box, Container } from "@mui/material";
import AdverseEventsList from "./AdverseEventsList";
import { FilterLowRisk, FilterHighRisk } from "../Utils/FilterFunctions";

/**
 * Renders a detailed view of a patient's information,
 * including their name, ID, room number, and a list of their adverse events
 * categorized by risk level (high and low).
 *
 * AdverseEventsList handles the rendering of both high-risk and low-risk events.
 * @returns {JSX.Element} - The detail page for a specific patient.
 */
export default function DetailPage({ riskRange, patientData }) {
  const { value } = useParams(); // Extract the patient's name from the URL parameter
  const person = patientData.find((item) => item.PID.includes(value)); // Find the patient data based on the name

  return (
    <Container mt={5} maxWidth="xl">
      {/* Render patient's general information: name, PID, and room number */}
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

      {/* Render lists of high-risk and low-risk adverse events */}
      <Box
        sx={{
          display: "flex",
          mt: 4,
          border: "1.5px solid #000",
        }}
      >
        {/* High-risk adverse events list */}
        <Box sx={{ flex: 3 }}>
          <AdverseEventsList
            adverseEvents={person.adverseEvents}
            riskFilter={FilterLowRisk}
            header="High Risk Adverse Events"
            bgColor="#f7917d"
            riskRange={riskRange}
          />
        </Box>

        {/* Vertical separator between high-risk and low-risk lists */}
        <Box sx={{ borderLeft: "1.5px solid #000" }} />

        {/* Low-risk adverse events list */}
        <Box sx={{ flex: 1.5 }}>
          <AdverseEventsList
            adverseEvents={person.adverseEvents}
            riskFilter={FilterHighRisk}
            header="Low Risk Adverse Events"
            bgColor="#82c3f6"
            riskRange={riskRange}
          />
        </Box>
      </Box>

      {/* Back button to return to the previous page */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Link to="/">
          <Button variant="contained">Back</Button>
        </Link>
      </Box>
    </Container>
  );
}
