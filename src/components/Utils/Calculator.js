import * as d3 from "d3";
import { FilterUnwantedAdverse } from "./FilterFunctions";
import { riskRange } from "../../App";

/**
 * Using d3 to define color scale,
 * ordinal so there is no gradient.
 * Each risk level maps to an array of three colors: [primary, secondary, tertiary].
 */
export const colorScale = d3
  .scaleOrdinal()
  .domain(["Minimal", "Moderate", "Moderate High", "High"])
  .range([
    ["#87E7FF", "#A6EDFF", "#CCF5FF"], // Minimal: [primary, secondary, tertiary]
    ["#FEEA77", "#FEF1A5", "#FFF7CC"], // Moderate: [primary, secondary, tertiary]
    ["#F7924A", "#F7AF7C", "#FAC7A2"], // Moderate High: [primary, secondary, tertiary]
    ["#F16448", "#F99B89", "#FABBAF"], // High: [primary, secondary, tertiary]
  ]);

/**
 * Calculate risk level given a risk score
 * @param {number} riskScore - The risk score of an adverse event.
 * @param {Array<number>} riskRange - The current risk range used to define levels.
 * @returns {string} Possible values are "Minimal", "Moderate",
 * "Moderate High", and "High"
 */
export function calculateRisk(riskScore, riskRange) {
  const [min, mod, modHigh, high] = riskRange;
  let riskLevel;
  if (riskScore >= 0 && riskScore < min) riskLevel = "Minimal";
  else if (riskScore >= min && riskScore < mod) riskLevel = "Moderate";
  else if (riskScore >= mod && riskScore < modHigh) riskLevel = "Moderate High";
  else if (riskScore >= modHigh && riskScore <= high) riskLevel = "High";
  return riskLevel;
}

/**
 * Calculate text color and an array of background colors
 * based on the risk score
 * @param {number} riskScore - The risk score as a number
 * @param {Array<number>} riskRange - The current risk range used to define levels.
 * @returns {Array<string>} An array where the first element
 * is the text color, and the remaining elements are the background colors
 */
export function calculateColor(riskScore, riskRange) {
  const riskLevel = calculateRisk(riskScore, riskRange);
  // Get the array of colors from the scale
  const colors = colorScale(riskLevel);
  const textColor =
    riskLevel === "Moderate High" || riskLevel === "High" ? "white" : "black";

  return [textColor, ...colors];
}

/**
 * Get the secondary and tertiary colors corresponding to the
 * highest risk score among a patient's adverse events
 * @param {Object} patient - The patient object containing adverse events
 * @param {Array<Object>} patient.adverseEvents - Array of adverse events
 * @param {Array<number>} riskRange - The current risk range used to define levels.
 * @returns {Array<string>} An array containing the secondary
 * and tertiary colors for the highest risk adverse event
 */
export function highestRiskColor(patient, riskRange) {
  const risks = patient.adverseEvents;
  const filteredRisks = FilterUnwantedAdverse(risks);
  const highestRisk = Math.max(
    ...filteredRisks.map((event) => event.riskScore),
    0
  );

  const [textColor, primary, secondary, tertiary] = calculateColor(
    highestRisk,
    riskRange
  );
  return [secondary, tertiary];
}
