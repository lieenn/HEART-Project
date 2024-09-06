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
  const [color] = highestRiskColor(patient, riskRange);
  const [relevant, others] = filterRelevantAndOtherEvents(
    selectedAdverseEvents,
    patient.adverseEvents,
    riskRange
  );

  const displayPID = patient.PID.replace("# ", "").trim();
  const isLowRisk = relevant.length === 0 && others.length === 0;
  // if (isLowRisk && !showFilteredOutcomes) {
  //   console.log("No adverse events predicted for this patient at this time.");
  // }

  const leftContent = (
    <PatientInfo
      displayPID={displayPID}
      color={color}
      isFavorite={isFavorite}
      onToggleFavorite={() => onToggleFavorite(patient.PID)}
    />
  );

  const rightContent = (
    <Box sx={{ p: 2 }}>
      <PatientRisks
        adverseEvents={getAdverseEvents(
          showFilteredOutcomes,
          relevant,
          others,
          isLowRisk
        )}
        riskRange={riskRange}
      />
    </Box>
  );

  return <TableRow leftContent={leftContent} rightContent={rightContent} />;
}

function getAdverseEvents(showFilteredOutcomes, relevant, others, isLowRisk) {
  if (isLowRisk && !showFilteredOutcomes) {
    return [
      {
        title: "No adverse events predicted for this patient at this time.",
        riskScore: 0,
      },
    ];
  }
  if (showFilteredOutcomes) {
    return relevant;
  }
  return others;
}
