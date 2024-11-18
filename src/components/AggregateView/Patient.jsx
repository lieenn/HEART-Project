import React from "react";
import { Box } from "@mui/material";
import PatientRisks from "./PatientRisks";
import { highestRiskColor } from "../Utils/Calculator";
import { filterRelevantAndOtherEvents } from "../Utils/FilterFunctions";
import PatientInfo from "./PatientInfo";
import TableRow from "./TableRow";

export default function Patient({
  patient,
  riskRange,
  selectedAdverseEvents,
  showFilteredOutcomes,
  isFavorite,
  onToggleFavorite,
  view,
  direction,
  borderline,
}) {
  const color = highestRiskColor(patient, riskRange);
  const [relevant, others] = filterRelevantAndOtherEvents(
    selectedAdverseEvents,
    patient.adverseEvents,
    riskRange
  );

  if (
    !isFavorite &&
    selectedAdverseEvents.length > 0 &&
    relevant.length === 0
  ) {
    return null;
  }

  const displayPID = patient.patientId;
  const patientInfo = (
    <PatientInfo
      displayPID={displayPID}
      color={color}
      isFavorite={isFavorite}
      onToggleFavorite={() => onToggleFavorite(patient.patientId)}
    />
  );

  const patientRisks = (
    <PatientRisks
      adverseEvents={getAdverseEvents(
        showFilteredOutcomes,
        relevant,
        others,
        selectedAdverseEvents
      )}
      riskRange={riskRange}
      view={view}
      direction={direction}
      borderline={borderline}
    />
  );

  if (direction === "horizontal") {
    return <TableRow leftContent={patientInfo} rightContent={patientRisks} />;
  }

  // Vertical layout
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1,
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        display: "inline-block",
      }}
    >
      {patientInfo}
      {patientRisks}
    </Box>
  );
}

function getAdverseEvents(
  showFilteredOutcomes,
  relevant,
  others,
  selectedAdverseEvents
) {
  // For patients with no adverse events at all
  if (relevant.length === 0 && others.length === 0) {
    return [
      {
        title: "No adverse events predicted at this time.",
        riskScore: 0,
        confidenceInterval: {
          low: 0.0,
          high: 0.0,
        },
      },
    ];
  }

  // When filters are applied and there are no relevant events
  if (selectedAdverseEvents.length > 0 && relevant.length === 0) {
    return [
      {
        title: "No filtered adverse events for this patient.",
        riskScore: 0,
        confidenceInterval: {
          low: 0.0,
          high: 0.0,
        },
      },
    ];
  }

  // When showing filtered outcomes or all outcomes
  return showFilteredOutcomes ? relevant : others;
}
