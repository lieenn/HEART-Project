import { calculateRisk } from "./Calculator";

/**
 * Helper function for filters out events where the riskScore is not 0.0.
 * @param {Array} patientAdverseEvents - The array of adverse events.
 * @returns {Array} - The filtered array of risks.
 */
export function FilterLowRisk(patientAdverseEvents) {
  return patientAdverseEvents.filter(
    (event) => calculateRisk(event.riskScore) !== "Minimal"
  );
}

export function FilterHighRisk(patientAdverseEvents) {
  return patientAdverseEvents.filter(
    (event) => calculateRisk(event.riskScore) === "Minimal"
  );
}

/**
 * Helper function to filter out adverse events from the table.
 * @param {Array} patientAdverseEvents - The array of adverse events.
 * @returns {Array} - The filtered array of risks.
 */
export function FilterUnwantedAdverse(patientAdverseEvents) {
  const titles = ["Length of Stay", "Morbidity"];
  return patientAdverseEvents.filter(
    (event) => !titles.some((title) => event.title.includes(title))
  );
}
