import * as d3 from "d3";
import { FilterUnwantedAdverse } from "./FilterFunctions";
import { riskRange } from "../../App";

// Central color configuration
const color = {
  minimal: {
    primary: "#d0e7fe",
    secondary: "#99CDF6",
    text: "black",
  },
  moderate: {
    primary: "#ffea6f",
    secondary: "#FEF1A5",
    text: "black",
  },
  moderateHigh: {
    primary: "#FFA500",
    secondary: "#F7AF7C",
    text: "white",
  },
  high: {
    primary: "#ff7043",
    secondary: "#F99B89",
    text: "white",
  },
};

// #ff624f
// #E23D28 --> alternative color -- cute chili red -- but needs white font
// #97C5F6 --> light blue

/**
 * Using d3 to define color scale,
 * ordinal so there is no gradient.
 * Each risk level maps to an array of three colors: [primary, secondary].
 */
export const colorScale = d3
  .scaleOrdinal()
  .domain(["Minimal", "Moderate", "Moderate High", "High"])
  .range([
    [color.minimal.primary, color.minimal.secondary],
    [color.moderate.primary, color.moderate.secondary],
    [color.moderateHigh.primary, color.moderateHigh.secondary],
    [color.high.primary, color.high.secondary],
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
  if (riskScore >= 0 && riskScore < min) return "Minimal";
  if (riskScore >= min && riskScore < mod) return "Moderate";
  if (riskScore >= mod && riskScore < modHigh) return "Moderate High";
  if (riskScore >= modHigh && riskScore <= high) return "High";
  return "Unknown";
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
  const colors = colorScale(riskLevel);
  const textColor =
    riskLevel === "Moderate High" || riskLevel === "High"
      ? color.moderateHigh.text
      : color.minimal.text;

  return [textColor, ...colors];
}

export function borderLineColor(riskScore, riskRange) {
  const riskLevel = calculateRisk(riskScore, riskRange);
  return riskLevel === "Minimal"
    ? color.moderate.primary
    : color.minimal.primary;
}

/**
 * Get the primary colors corresponding to the
 * highest risk score among a patient's adverse events
 * @param {Object} patient - The patient object containing adverse events
 * @param {Array<Object>} patient.adverseEvents - Array of adverse events
 * @param {Array<number>} riskRange - The current risk range used to define levels.
 * @returns {string} primary color
 */
export function highestRiskColor(patient, riskRange) {
  const risks = patient.adverseEvents;
  const filteredRisks = FilterUnwantedAdverse(risks);
  const highestRisk = Math.max(
    ...filteredRisks.map((event) => event.riskScore),
    0
  );

  const [textColor, primary] = calculateColor(highestRisk, riskRange);
  return primary;
}
