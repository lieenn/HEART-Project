import React from "react";
import { Box, Container } from "@mui/material";
import PatientRiskStatus from "./PatientRiskStatus";
import { FilterLowRisk, FilterUnwantedAdverse } from "../Utils/FilterFunctions";

/**
 * PatientRisks Component
 *
 * This component filters, sorts, and displays a list of adverse events for a patient.
 * It filters out low-risk events and unwanted adverse events, then displays each event
 * as a colored rectangle, with the highest risk events shown first.
 *
 * @param {Object} props - The component properties.
 * @param {Array<Object>} props.adverseEvents - Array of adverse events associated with the patient.
 * @param {Array<number>} props.riskRange - The dynamic range [min, max] of risk scores used to filter events.
 * @returns {JSX.Element} - The rendered list of filtered and sorted patient risks.
 */
export default function PatientRisks({ adverseEvents, riskRange }) {
  // Filter out unwanted and low-risk adverse events
  const filteredRisks = FilterLowRisk(
    FilterUnwantedAdverse(adverseEvents),
    riskRange
  );

  // Sort filtered adverse events by descending risk score
  const sortedRisks = filteredRisks.sort((a, b) => b.riskScore - a.riskScore);

  return (
    <Container sx={{ border: "none", display: "inline-flex", padding: 0 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {/* Display a message if no adverse events meet the criteria, otherwise render the risk statuses */}
        {sortedRisks.map((risk, index) => (
          <PatientRiskStatus key={index} risk={risk} riskRange={riskRange} />
        ))}
      </Box>
    </Container>
  );
}
