import React from "react";
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
}) {
  const color = highestRiskColor(patient, riskRange);
  const [relevant, others] = filterRelevantAndOtherEvents(
    selectedAdverseEvents,
    patient.adverseEvents,
    riskRange
  );

  // Only hide non-favorite patients with no relevant events when filters are applied
  if (
    !isFavorite &&
    selectedAdverseEvents.length > 0 &&
    relevant.length === 0
  ) {
    return null;
  }

  const displayPID = patient.patientId;

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
        selectedAdverseEvents
      )}
      riskRange={riskRange}
      view={view}
    />
  );

  return <TableRow leftContent={leftContent} rightContent={rightContent} />;
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
        title: "No adverse events predicted for this patient at this time.",
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
