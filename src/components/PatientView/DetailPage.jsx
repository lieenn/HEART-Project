import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Typography,
  Grid,
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
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

  const riskViews = [
    {
      type: "High",
      bgColor: "#f7917d", // is there a way to make this not constant and say, primary etc?
      fontColor: "black",
      riskFilterFn: GetHighRisks,
      size: {
        xs: "12",
        sm: "12",
        md: "7",
        lg: "8",
      },
    },
    {
      type: "Low",
      bgColor: "#99CDF6", // is there a way to make this not constant and say, primary etc?
      fontColor: "black",
      riskFilterFn: GetLowRisks,
      size: {
        xs: "12",
        sm: "12",
        md: "5",
        lg: "4",
      },
    },
  ];

  let detailCardGrids = riskViews.map((view) => {
    return (
      <Grid item {...view.size}>
        <Card elevation={4}>
          <CardHeader
            title={view.type + " Risk Adverse Events"}
            sx={{
              backgroundColor: view.bgColor,
              textAlign: "center",
              padding: 1,
              fontWeight: 600,
              color: view.fontColor,
            }}
          />

          <CardContent>
            <Typography variant="p">
              Patient is predicted <b>{view.type.toLowerCase()} risk</b> for
              these adverse events:
            </Typography>
            <AdverseEventsList
              adverseEvents={person.adverseEvents}
              riskFilter={view.riskFilterFn}
              riskRange={riskRange}
            />
          </CardContent>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid
      container
      sx={{
        mt: { xs: 2, sm: 3, md: 4 },
        // border: "1.5px solid #000",
      }}
      spacing={3}
    >
      <Grid item xs={12} sm={8} md={9} lg={10}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          {person.patientName}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4} md={3} lg={2}>
        <Typography variant="h6">PID: {person.patientId}</Typography>
        <Typography variant="h6">Room # {person.roomNumber}</Typography>
      </Grid>
      {detailCardGrids}
      <Grid item>
        <Link to="/">
          <Button variant="contained">Back</Button>
        </Link>
      </Grid>
    </Grid>
  );
}
