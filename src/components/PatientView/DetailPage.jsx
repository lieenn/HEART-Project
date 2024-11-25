import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Box,
} from "@mui/material";
import AdverseEventsList from "./AdverseEventsList";
import { GetHighRisks, GetLowRisks } from "../Utils/FilterFunctions";
import ColorLegend from "../SharedComponents/ColorLegend";
import PredictedLos from "./PredictedLoS";

export default function DetailPage({ riskRange, patientData, borderline }) {
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
      isLowRisk: false,
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
      isLowRisk: true,
    },
  ];

  let detailCardGrids = riskViews.map((riskView, index) => (
    <Grid item key={index} {...riskView.size}>
      <Card elevation={4}>
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                border: 1,
                borderRadius: "4px",
              }}
            >
              {`${riskView.type} Risk Adverse Events`}
            </Typography>
          }
          sx={{
            backgroundColor: riskView.bgColor,
            textAlign: "center",
            padding: 1,
            color: riskView.fontColor,
          }}
        />
        <CardContent>
          <Typography variant="body1">
            Patient is predicted <b>{riskView.type.toLowerCase()} risk</b> for
            these adverse events:
          </Typography>
          <AdverseEventsList
            adverseEvents={person.adverseEvents}
            riskFilter={riskView.riskFilterFn}
            riskRange={riskRange}
            borderline={borderline}
            header={`${riskView.type} Risk Adverse Events`}
            isLowRisk={riskView.isLowRisk}
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2, 
          }}
        >
          <Avatar
            src="/broken-image.jpg"
            sx={{
              width: 56, 
              height: 56,
            }}
          />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Patient: {person.patientId}
            </Typography>
            <Typography variant="body1">Room # {person.roomNumber}</Typography>
          </Box>
        </Box>
        <ColorLegend />
      </Grid>
      {/* <Grid item xs={12} sm={4} md={3} lg={2}>
        <Typography variant="h6">Patient ID: {person.patientId}</Typography>
      </Grid> */}

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
