import { riskRange } from "../../App";
import { calculateRisk } from "./Calculator";

/**
 * Filters adverse events to return only those that are
 * considered "Moderate," "Moderate High," or "High" risk.
 * @param {Array<Object>} patientAdverseEvents - An array of adverse event objects
 * @returns {Array<Object>} Adverse events that have a risk level other than "Minimal".
 */
export function FilterLowRisk(patientAdverseEvents, riskRange) {
  return patientAdverseEvents.filter(
    (event) => calculateRisk(event.riskScore, riskRange) !== "Minimal"
  );
}

/**
 * Filters adverse events to return only those that are
 * considered "Minimal" risk
 * @param {Array} patientAdverseEvents - An array of adverse event objects
 * @returns {Array} Adverse events that have a risk level of "Minimal".
 */
export function FilterHighRisk(patientAdverseEvents, riskRange) {
  return patientAdverseEvents.filter(
    (event) => calculateRisk(event.riskScore, riskRange) === "Minimal"
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

export function GetUniqueAdverseEvents(patientData) {
  const adverseEvents = patientData.reduce((events, x) => {
    const filteredEvents = FilterUnwantedAdverse(x.adverseEvents);
    filteredEvents.forEach((event) => {
      const title = event.title;
      if (title && !events.includes(title)) {
        events.push(title);
      }
    });
    return events;
  }, []);

  return adverseEvents;
}
