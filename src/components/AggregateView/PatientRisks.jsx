import React from "react";
import { Box, Container } from "@mui/material";
import PatientRiskStatus from "./PatientRiskStatus";
import { FilterLowRisk, FilterUnwantedAdverse } from "../Utils/FilterFunctions";

/**
 * Renders a list of risks for a patient.
 * If there are no risks, it will display a message.
 * @param {Object} param0 - The adverse events of the patient
 * @returns {JSX.Element} The rendered list of risks
 */
export default function PatientRisks({ adverseEvents }) {
  // Filter and sort adverse events
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
        {/* Renders a list of risk status of the patient
                Returns a message if there is no risk */}
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
