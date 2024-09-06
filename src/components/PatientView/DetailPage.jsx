import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, Grid, Container, Box } from "@mui/material";
import AdverseEventsList from "./AdverseEventsList";
import { FilterLowRisk, FilterHighRisk } from "../Utils/FilterFunctions";

export default function DetailPage({ riskRange, patientData }) {
  const { value } = useParams();
  const person = patientData.find((item) => item.PID.includes(value));

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: 2, sm: 3, md: 5 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {person.PatientName}
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
          md={8}
          lg={9}
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
            riskFilter={FilterLowRisk}
            header="High Risk Adverse Events"
            bgColor="#f7917d"
            riskRange={riskRange}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={3}>
          <AdverseEventsList
            adverseEvents={person.adverseEvents}
            riskFilter={FilterHighRisk}
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
