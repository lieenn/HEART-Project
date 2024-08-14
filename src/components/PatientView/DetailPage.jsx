import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, Box, Container } from "@mui/material";
import patientView from "../../Json files 2 patients/patientView.json";
import AdverseEvents from "./AdverseEvents";

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
    <Container textAlign="center" mt={5} maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        {person.PatientName}
      </Typography>
      {/* Assuming you want to pass patient details to MuiList */}
      <AdverseEvents adverseEvents={person.adverseEvents} />
      <Link to="/">
        <Button variant="contained" sx={{ mt: 2 }}>
          Back
        </Button>
      </Link>
    </Container>
  );
}
