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
    ["#08F4CB", "#80FAE5", "#C8FAF1"], // Minimal: [primary, secondary, tertiary]
    ["#FEEA77", "#FEEF98", "#FEF8D8"], // Moderate: [primary, secondary, tertiary]
    ["#EB8B2A", "#EBB176", "#EBC8A4"], // Moderate High: [primary, secondary, tertiary]
    ["#F14725", "#F9A393", "#FBC8BE"], // High: [primary, secondary, tertiary]
  ]);

/**
 * Calculate risk level given a risk score
 * @param {number} riskScore - The risk score of an adverse event.
 * @returns {string} Possible values are "Minimal", "Moderate",
 * "Moderate High", and "High"
 */
export function calculateRisk(riskScore) {
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
 * @returns {Array<string>} An array where the first element
 * is the text color, and the remaining elements are the background colors
 */
export function calculateColor(riskScore) {
  const riskLevel = calculateRisk(riskScore);
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
 * @returns {Array<string>} An array containing the secondary
 * and tertiary colors for the highest risk adverse event
 */
export function highestRiskColor(patient) {
  const risks = patient.adverseEvents;
  const filteredRisks = FilterUnwantedAdverse(risks);
  const highestRisk = filteredRisks.reduce((highest, current) => {
    return highest.riskScore > current.riskScore ? highest : current;
  }, filteredRisks[0]);
  console.log("highest", highestRisk);

  const [textColor, primary, secondary, tertiary] = calculateColor(
    highestRisk.riskScore
  );
  return [secondary, tertiary];
}
