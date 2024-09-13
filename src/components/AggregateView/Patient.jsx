import React from "react";
import PatientRisks from "./PatientRisks";
import { highestRiskColor } from "../Utils/Calculator";
import { filterRelevantAndOtherEvents } from "../Utils/FilterFunctions";
import PatientInfo from "./PatientInfo";
import TableRow from "./TableRow";
import { Box } from "@mui/material";

export default function Patient({
  patient,
  riskRange,
  selectedAdverseEvents,
  showFilteredOutcomes,
  isFavorite,
  onToggleFavorite,
}) {
  const color = highestRiskColor(patient, riskRange);
  const [relevant, others] = filterRelevantAndOtherEvents(
    selectedAdverseEvents,
    patient.adverseEvents,
    riskRange
  );

  // If there are selected adverse events and no relevant risks, don't render the patient
  if (selectedAdverseEvents.length > 0 && relevant.length === 0) {
    return null;
  }

  const displayPID = patient.patientId;
  const isLowRisk = relevant.length === 0 && others.length === 0;

  const leftContent = (
    <PatientInfo
      displayPID={displayPID}
      color={color}
      isFavorite={isFavorite}
      onToggleFavorite={() => onToggleFavorite(patient.patientId)}
    />
  );

  const rightContent = (
    <PatientRisks
      adverseEvents={getAdverseEvents(
        showFilteredOutcomes,
        relevant,
        others,
        isLowRisk
      )}
      riskRange={riskRange}
    />
  );

  return <TableRow leftContent={leftContent} rightContent={rightContent} />;
}

function getAdverseEvents(showFilteredOutcomes, relevant, others, isLowRisk) {
  if (isLowRisk && !showFilteredOutcomes) {
    return [
      {
        title: "No adverse events predicted for this patient at this time.",
        riskScore: 0,
        confidenceInterval: {
          low: 0.0,
          high: 0.0,
        },
      },
    ];
  }
  if (showFilteredOutcomes) {
    return relevant;
  }
  return others;
}
