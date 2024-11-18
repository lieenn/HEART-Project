import React from "react";
import { Box } from "@mui/material";
import PatientRiskStatus from "./PatientRiskStatus";

export default function PatientRisks({
  adverseEvents,
  riskRange,
  view,
  direction,
  borderline,
}) {
  const sortedRisks = [...adverseEvents].sort(
    (a, b) => b.riskScore - a.riskScore
  );

  return (
    <Box
      sx={{
        display: direction === "horizontal" ? "flex" : "block",
        flexDirection: direction === "vertical" ? "column" : "row",
        flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
        gap: 1,
        width: "100%",
        alignItems: direction === "vertical" ? "stretch" : "center",
      }}
    >
      {sortedRisks.map((risk, index) => (
        <Box
          key={risk.title || index}
          sx={{
            width: direction === "vertical" ? "100%" : "auto",
          }}
        >
          <PatientRiskStatus
            risk={risk}
            riskRange={riskRange}
            view={view}
            isVertical={direction === "vertical"}
            borderline={borderline}
          />
        </Box>
      ))}
    </Box>
  );
}
