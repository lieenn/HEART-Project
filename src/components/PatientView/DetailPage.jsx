import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import AdverseEventsList from "./AdverseEventsList";
import { GetHighRisks, GetLowRisks } from "../Utils/FilterFunctions";
import ColorLegend from "../SharedComponents/ColorLegend";
import PredictedLos from "./PredictedLoS";

export default function DetailPage({ riskRange, patientData }) {
  const { value } = useParams();
  const person = patientData.find((item) => item.patientId == value);

  const riskViews = [
    {
      type: "High",
      bgColor: "white",
      fontColor: "#fa2104",
      riskFilterFn: GetHighRisks,
      size: {
        xs: 12,
        sm: 12,
        md: 7,
        lg: 8,
      },
    },
    {
      type: "Low",
      bgColor: "white",
      fontColor: "#65b5f3",
      riskFilterFn: GetLowRisks,
      size: {
        xs: 12,
        sm: 12,
        md: 5,
        lg: 4,
      },
    },
  ];

  let detailCardGrids = riskViews.map((view, index) => (
    <Grid item key={index} {...view.size}>
      <Card elevation={4}>
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                // textShadow: "2px 2px 4px rgba(0,0,0,0.3)", // Added text shadow
                border: 1,
                borderRadius: '4px'
              }}
            >
              {`${view.type} Risk Adverse Events`}
            </Typography>
          }
          sx={{
            backgroundColor: view.bgColor,
            textAlign: "center",
            padding: 1,
            color: view.fontColor,
          }}
        />
        <CardContent>
          <Typography variant="body1">
            Patient is predicted <b>{view.type.toLowerCase()} risk</b> for these
            adverse events:
          </Typography>
          <AdverseEventsList
            adverseEvents={person.adverseEvents}
            riskFilter={view.riskFilterFn}
            riskRange={riskRange}
          />
        </CardContent>
      </Card>
    </Grid>
  ));

  return (
    <Grid
      container
      sx={{
        mt: { xs: 2, sm: 3, md: 4 },
      }}
      spacing={3}
    >
      <Grid item xs={12} sm={8} md={9} lg={10}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          {person.patientName}
        </Typography>
        <ColorLegend />
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <Typography variant="h6">Patient ID: {person.patientId}</Typography>
        <Typography variant="h6">Room # {person.roomNumber}</Typography>
      </Grid>

      {detailCardGrids}
      <Grid item xs={8}>
        <Card elevation={4}>
          <CardContent>
            <PredictedLos
              lengthOfStayEstimate={person.lengthOfStayEstimate}
              lengthOfStayRange={person.lengthOfStayRange}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Link to="/">
          <Button variant="contained">Back</Button>
        </Link>
      </Grid>
    </Grid>
  );
}
