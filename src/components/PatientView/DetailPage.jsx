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
import Legend from "../SharedComponents/Legend";
import PredictedLos from "./PredictedLoS";

export default function DetailPage({
  riskRange,
  patientData,
  borderline,
  riskLabel,
  los,
  showUncertainty,
  children,
}) {
  const { value } = useParams();
  const person = patientData.find((item) => item.patientId == value);

  // Modify the riskViews array to include Length of Stay positioning
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

  // In the return statement, modify the grid layout:
  return (
    <Grid container sx={{ mt: { xs: 2, sm: 3, md: 4 } }} spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar src="/broken-image.jpg" sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Patient: {person.patientId}
            </Typography>
            <Typography variant="body1">Room # {person.roomNumber}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Legend riskRange={riskRange} />
          <Box>{children}</Box>
        </Box>
      </Grid>

      <Grid container item xs={12} md={7} lg={8} spacing={3}>
        <Grid item xs={12}>
          <Card elevation={4}>
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, border: 1, borderRadius: "4px" }}
                >
                  High Risk Adverse Events
                </Typography>
              }
              sx={{
                backgroundColor: "white",
                textAlign: "center",
                padding: 1,
                color: "#fa2104",
              }}
            />
            <CardContent>
              <Typography variant="body1">
                Patient is predicted <b>high risk</b> for these adverse events:
              </Typography>
              <AdverseEventsList
                adverseEvents={person.adverseEvents}
                riskFilter={GetHighRisks}
                riskRange={riskRange}
                borderline={borderline}
                header="High Risk Adverse Events"
                isLowRisk={false}
                riskLabel={riskLabel}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={4}>
            <CardContent>
              <PredictedLos
                lengthOfStayEstimate={person.lengthOfStayEstimate}
                lengthOfStayRange={person.lengthOfStayRange}
                patientData={patientData}
                patient={person}
                los={los}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <Card elevation={4}>
          <CardHeader
            title={
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, border: 1, borderRadius: "4px" }}
              >
                Low Risk Adverse Events
              </Typography>
            }
            sx={{
              backgroundColor: "white",
              textAlign: "center",
              padding: 1,
              color: "#65b5f3",
            }}
          />
          <CardContent>
            <Typography variant="body1">
              Patient is predicted <b>low risk</b> for these adverse events:
            </Typography>
            <AdverseEventsList
              adverseEvents={person.adverseEvents}
              riskFilter={GetLowRisks}
              riskRange={riskRange}
              borderline={borderline}
              header="Low Risk Adverse Events"
              isLowRisk={true}
              riskLabel={riskLabel}
              showUncertainty={showUncertainty}
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
