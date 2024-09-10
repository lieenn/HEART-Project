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
    ["#d0e7fe", "#99CDF6", "#d0e7fe"], // Minimal: [primary, secondary, tertiary]
    ["#ffea6f", "#FEF1A5", "#ffea6f"], // Moderate: [primary, secondary, tertiary]
    ["#FFA500", "#F7AF7C", "#FFA500"], // Moderate High: [primary, secondary, tertiary]
    ["#ff7043", "#F99B89", "#ff7043"], // High: [primary, secondary, tertiary]
  ]);

//#ff624f
// #E23D28 --> alternative color -- cute chili red -- but needs white font

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

export function borderLineColor(riskScore, riskRange) {
  const riskLevel = calculateRisk(riskScore, riskRange);
  const colors = riskLevel === "Minimal" ? ["#ffea6f"] : ["#97C5F6"];
  return colors[0];
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
  return [primary];
}
