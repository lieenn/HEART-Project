/**
 * Helper function for filters out events where the riskScore is not 0.0.
 * @param {Array} patientAdverseEvents - The array of adverse events.
 * @returns {Array} - The filtered array of risks.
 */
export function FilterNoRisk({ patientAdverseEvents }) {
  return patientAdverseEvents.filter((event) => event.riskScore !== 0.0);
}

/**
 * Helper function to filter out adverse events from the table.
 * @param {Array} patientAdverseEvents - The array of adverse events.
 * @returns {Array} - The filtered array of risks.
 */
export function FilterUnwantedAdverse({ patientAdverseEvents, titles }) {
  return patientAdverseEvents.filter(
    (event) => !titles.some((title) => event.title.includes(title))
  );
}
