import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, Grid, Container, Box } from "@mui/material";
import AdverseEventsList from "./AdverseEventsList";
import { GetHighRisks, GetLowRisks } from "../Utils/FilterFunctions";

/**
 * DetailPage component for displaying detailed patient information.
 * @param {Object} props - Component props
 * @param {Array<number>} props.riskRange - Array of risk thresholds
 * @param {Array<Object>} props.patientData - Array of patient data objects
 * @returns {JSX.Element} The rendered DetailPage component
 */
export default function DetailPage({ riskRange, patientData }) {
  /**
   * @constant {Object} params - URL parameters
   * @property {string} value - Patient ID from URL
   */
  const { value } = useParams();

  /**
   * @constant {Object} person - Patient data object for the selected patient
   */
  const person = patientData.find((item) => item.patientId == value);

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: 2, sm: 3, md: 5 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {person.patientName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Typography variant="h6">PID: {person.PID}</Typography>
          <Typography variant="h6">Room # {person.roomNumber}</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          mt: { xs: 2, sm: 3, md: 4 },
          border: "1.5px solid #000",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          lg={8}
          sx={{
            borderRight: { xs: "none", sm: "none", md: "1.5px solid #000" },
            borderBottom: {
              xs: "1.5px solid #000",
              sm: "1.5px solid #000",
              md: "none",
            },
          }}
        >
          <AdverseEventsList
            adverseEvents={person.adverseEvents}
            riskFilter={GetHighRisks}
            header="High Risk Adverse Events"
            bgColor="#f7917d"
            riskRange={riskRange}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={5} lg={4}>
          <AdverseEventsList
            adverseEvents={person.adverseEvents}
            riskFilter={GetLowRisks}
            header="Low Risk Adverse Events"
            bgColor="#82c3f6"
            riskRange={riskRange}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="center"
        sx={{ mt: { xs: 2, sm: 3, md: 4 } }}
      >
        <Grid item>
          <Link to="/">
            <Button variant="contained">Back</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
