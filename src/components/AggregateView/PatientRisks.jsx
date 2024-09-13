import React from "react";
import { Box } from "@mui/material";
import PatientRiskStatus from "./PatientRiskStatus";

export default function PatientRisks({ adverseEvents, riskRange }) {
  // Always sort the adverse events by descending risk score
  const sortedRisks = [...adverseEvents].sort(
    (a, b) => b.riskScore - a.riskScore
  );

  if (
    sortedRisks.length === 1 &&
    sortedRisks[0].title ===
      "No adverse events predicted for this patient at this time."
  ) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <PatientRiskStatus risk={sortedRisks[0]} riskRange={riskRange} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "inline-flex" }}>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {sortedRisks.map((risk, index) => (
          <PatientRiskStatus
            key={risk.title || index}
            risk={risk}
            riskRange={riskRange}
          />
        ))}
      </Box>
    </Box>
  );
}
