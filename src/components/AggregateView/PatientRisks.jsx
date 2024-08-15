import React from "react";
import { Box, Container } from "@mui/material";
import PatientRiskStatus from "./PatientRiskStatus";
import { FilterLowRisk, FilterUnwantedAdverse } from "../Utils/FilterFunctions";

/**
 * Renders a list of risks for a patient.
 * If there are no risks, it will display a message.
 * @param {Object} param0
 * @returns
 */
export default function PatientRisks({ adverseEvents = [] }) {
  // Default to an empty array
  console.log(adverseEvents);

  // Check if adverseEvents is an array
  if (!Array.isArray(adverseEvents)) {
    console.error(
      "Expected an array for adverseEvents but received:",
      typeof adverseEvents
    );
    return <div>Error: Adverse Events data is not available.</div>;
  }

  const risks = FilterUnwantedAdverse(adverseEvents);

  const filteredRisks = FilterLowRisk(risks);
  const sortedRisks = filteredRisks.sort((a, b) => b.riskScore - a.riskScore);

  return (
    <Container sx={{ border: "none" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        {sortedRisks.length === 0 ? (
          <PatientRiskStatus
            risk={{
              title:
                "No adverse events predicted for this patient at this time.",
              riskScore: 0,
            }}
          />
        ) : (
          filteredRisks.map((risk, index) => (
            <PatientRiskStatus key={index} risk={risk} />
          ))
        )}
      </Box>
    </Container>
  );
}
