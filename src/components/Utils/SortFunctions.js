import { GetHighRisks, FilterUnwantedAdverse } from "./FilterFunctions";

/**
 * Sort patients by the given adverse events, prioritizing those with more matching events
 * and higher riskScore. Filters out adverse events that are considered "Minimal" risk.
 * @param {Array<string>} EventsToSort - Titles of adverse events to prioritize
 * @param {Array<Object>} patientData - List of patient data to sort
 * @param {Array<number>} riskRange - Array defining risk score ranges for filtering
 * @return {Array<Object>} - Sorted list of patients
 */
export function SortByGiven(EventsToSort, patientData, riskRange) {
  // Sort patients
  return patientData.sort((a, b) => {
    // Filter out minimal risk events
    const relevantEventsA = GetHighRisks(
      FilterUnwantedAdverse(a.adverseEvents, riskRange),
      riskRange
    ).filter((event) => EventsToSort.includes(event.title));
    const relevantEventsB = GetHighRisks(
      FilterUnwantedAdverse(b.adverseEvents, riskRange),
      riskRange
    ).filter((event) => EventsToSort.includes(event.title));

    // Count the number of matching adverse events
    const countA = relevantEventsA.length;
    const countB = relevantEventsB.length;

    // If counts are different, prioritize by the count of matching adverse events
    if (countA !== countB) {
      return countB - countA; // More matching events come first
    }

    // If counts are the same, sort by highest riskScore among matching events
    const maxRiskScoreA = Math.max(
      ...relevantEventsA.map((event) => event.riskScore),
      0
    );
    const maxRiskScoreB = Math.max(
      ...relevantEventsB.map((event) => event.riskScore),
      0
    );

    return maxRiskScoreB - maxRiskScoreA; // Higher riskScore comes first
  });
}

/**
 * Sort patients by the given adverse events, prioritizing those with more matching events
 * and higher riskScore. Filter out adverseEvents that are not in the given list of events
 * and those considered "Minimal" risk.
 * @param {Array<string>} EventsToSort - Titles of adverse events to prioritize
 * @param {Array<Object>} patientData - List of patient data to sort
 * @param {Array<number>} riskRange - Array defining risk score ranges for filtering
 * @return {Array<Object>} - Sorted list of patients with filtered adverse events
 */
export function SortAndFilter(EventsToSort, patientData, riskRange) {
  // First, sort the patients based on the given events and filter out minimal risk events
  const sorted = SortByGiven(EventsToSort, patientData, riskRange);

  // Filter and transform the data to ensure only relevant adverse events are shown
  const filtered = sorted
    .map((patient) => {
      // Keep only those events which are in the EventsToSort list
      const relevantEvents = patient.adverseEvents.filter((event) =>
        EventsToSort.includes(event.title)
      );

      // Return patient with filtered adverse events
      return {
        ...patient,
        adverseEvents: relevantEvents,
      };
    })
    .filter((patient) => patient.adverseEvents.length > 0); // Ensure the patient has at least one relevant adverse event

  return filtered;
}

/**
 * Prioritize patients with highest risk score,
 * even if the adverse event is not in the given list
 * @param {*} EventsToSort
 * @param {*} patientData
 * @param {*} riskRange
 */
export function SortByHighest(EventsToSort, patientData, riskRange) {
  const sortedData = patientData.sort((a, b) => {
    const relevantEventsA = FilterUnwantedAdverse(a.adverseEvents, riskRange);
    const relevantEventsB = FilterUnwantedAdverse(b.adverseEvents, riskRange);
    const maxRiskScoreA = Math.max(
      ...relevantEventsA.map((event) => event.riskScore),
      0
    );
    const maxRiskScoreB = Math.max(
      ...relevantEventsB.map((event) => event.riskScore),
      0
    );

    return maxRiskScoreB - maxRiskScoreA; // Higher riskScore should come first
  });

  return sortedData;
}
