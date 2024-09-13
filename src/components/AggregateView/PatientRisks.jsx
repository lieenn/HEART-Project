import React from "react";
import { Box } from "@mui/material";
import PatientRiskStatus from "./PatientRiskStatus";

export default function PatientRisks({ adverseEvents, riskRange }) {
  const sortedRisks = [...adverseEvents].sort(
    (a, b) => b.riskScore - a.riskScore
  );

  return (
    <Box
      sx={{
        ml: { xs: 1, sm: 1.5, md: 2 },
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        height: "100%",
      }}
    >
      {sortedRisks.map((risk, index) => (
        <PatientRiskStatus
          key={risk.title || index}
          risk={risk}
          riskRange={riskRange}
        />
      ))}
    </Box>
  );
}
