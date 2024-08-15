import * as d3 from "d3";
import { FilterUnwantedAdverse } from "./FilterFunctions";

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

export function calculateRisk(riskScore) {
  let riskLevel;
  if (riskScore >= 0 && riskScore < 0.1) riskLevel = "Minimal";
  else if (riskScore >= 0.1 && riskScore < 0.4) riskLevel = "Moderate";
  else if (riskScore >= 0.4 && riskScore < 0.5) riskLevel = "Moderate High";
  else if (riskScore >= 0.5 && riskScore <= 1) riskLevel = "High";
  return riskLevel;
}

export function calculateColor(riskScore) {
  const riskLevel = calculateRisk(riskScore);
  // Get the array of colors from the scale
  const colors = colorScale(riskLevel);
  const textColor =
    riskLevel === "Moderate High" || riskLevel === "High" ? "white" : "black";

  return [textColor, ...colors];
}

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
