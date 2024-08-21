import React from "react";
import { Box, Container } from "@mui/material";
import PatientRiskStatus from "./PatientRiskStatus";
import { FilterLowRisk, FilterUnwantedAdverse } from "../Utils/FilterFunctions";

/**
 * Renders a list of risks for a patient.
 * Filters out low-risk events and unwanted adverse events.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.adverseEvents - The adverse events of the patient.
 * @param {Array<number>} props.riskRange - The dynamic range of risk scores.
 * @returns {JSX.Element} The rendered list of patient risks.
 */
export default function PatientRisks({ adverseEvents, riskRange }) {
  // Filter and sort adverse events
  const risks = FilterUnwantedAdverse(adverseEvents);
  const filteredRisks = FilterLowRisk(risks, riskRange);
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
        {/* Render a list of risk statuses or a message if there are none */}
        {sortedRisks.length === 0 ? (
          <PatientRiskStatus
            risk={{
              title:
                "No adverse events predicted for this patient at this time.",
              riskScore: 0,
            }}
            riskRange={riskRange}
          />
        ) : (
          filteredRisks.map((risk, index) => (
            <PatientRiskStatus key={index} risk={risk} riskRange={riskRange} />
          ))
        )}
      </Box>
    </Container>
  );
}
