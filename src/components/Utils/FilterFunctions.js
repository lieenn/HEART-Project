import { calculateRisk } from "./Calculator";

/**
 * Filters adverse events to return only those that are
 * considered "Moderate," "Moderate High," or "High" risk.
 * @param {Array<Object>} patientAdverseEvents - An array of adverse event objects
 * @returns {Array<Object>} Adverse events that have a risk level other than "Minimal".
 */
export function FilterLowRisk(patientAdverseEvents) {
  return patientAdverseEvents.filter(
    (event) => calculateRisk(event.riskScore) !== "Minimal"
  );
}

/**
 * Filters adverse events to return only those that are
 * considered "Minimal" risk
 * @param {Array} patientAdverseEvents - An array of adverse event objects
 * @returns {Array} Adverse events that have a risk level of "Minimal".
 */
export function FilterHighRisk(patientAdverseEvents) {
  return patientAdverseEvents.filter(
    (event) => calculateRisk(event.riskScore) === "Minimal"
  );
}

/**
 * Filters out adverse events that are considered unwanted based on their titles

 * This function excludes events with titles that match any of the unwanted
 * titles in the `titles` array, such as "Length of Stay" and "Morbidity".
 *
 * @param {Array<Object>} patientAdverseEvents - An array of adverse event objects, each containing a `title` property.
 * @returns {Array<Object>} An array of adverse events that do not include the unwanted titles.
 */
export function FilterUnwantedAdverse(patientAdverseEvents) {
  const titles = ["Length of Stay", "Morbidity"];
  return patientAdverseEvents.filter(
    (event) => !titles.some((title) => event.title.includes(title))
  );
}
