import React from "react";
import { Box, Typography } from "@mui/material";
import PatientRiskStatus from "./PatientRiskStatus";
import { FilterLowRisk, FilterUnwantedAdverse } from "../Utils/FilterFunctions";

export default function PatientRisks({ adverseEvents, riskRange }) {
  if (
    adverseEvents.length === 1 &&
    adverseEvents[0].title ===
      "          No adverse events predicted for this patient at this time."
  ) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* <Typography
          variant="body1"
          sx={{ fontStyle: "italic", color: "text.secondary" }}
        >
          No adverse events predicted for this patient at this time.
        </Typography> */}
        <PatientRiskStatus risk={adverseEvents[0]} riskRange={riskRange} />
      </Box>
    );
  }

  // Filter out unwanted and low-risk adverse events
  const filteredRisks = FilterLowRisk(
    FilterUnwantedAdverse(adverseEvents),
    riskRange
  );

  // Sort filtered adverse events by descending risk score
  const sortedRisks = filteredRisks.sort((a, b) => b.riskScore - a.riskScore);

  return (
    <Box
      sx={{
        display: "inline-flex",
        padding: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {sortedRisks.map((risk, index) => (
          <PatientRiskStatus key={index} risk={risk} riskRange={riskRange} />
        ))}
      </Box>
    </Box>
  );
}
