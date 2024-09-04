import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, Grid, Container, Box } from "@mui/material";
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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={10.5}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {person.PatientName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={1.5}>
          <Typography variant="h6">PID: {person.PID}</Typography>
          <Typography variant="h6">Room # {person.roomNumber}</Typography>
        </Grid>
      </Grid>

      {/* Render lists of high-risk and low-risk adverse events */}
      <Grid
        container
        sx={{
          mt: 4,
          border: "1.5px solid #000",
        }}
      >
        {/* High-risk adverse events list */}
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            borderRight: "1.5px solid #000", // Add border between the high-risk and low-risk sections
            padding: 2,
          }}
        >
          <AdverseEventsList
            adverseEvents={person.adverseEvents}
            riskFilter={FilterLowRisk}
            header="High Risk Adverse Events"
            bgColor="#f7917d"
            riskRange={riskRange}
          />
        </Grid>

        {/* Low-risk adverse events list */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            padding: 2,
          }}
        >
          <AdverseEventsList
            adverseEvents={person.adverseEvents}
            riskFilter={FilterHighRisk}
            header="Low Risk Adverse Events"
            bgColor="#82c3f6"
            riskRange={riskRange}
          />
        </Grid>
      </Grid>

      {/* Back button to return to the previous page */}
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item>
          <Link to="/">
            <Button variant="contained">Back</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
