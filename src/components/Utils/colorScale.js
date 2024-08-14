import * as d3 from "d3";

/**
 * Using d3 to define color scale,
 * ordinal so there is no gradient
 */
export const colorScale = d3
  .scaleOrdinal()
  .domain(["Minimal", "Moderate", "Moderate High", "High"])
  .range(["#08f4cb", "#feea77", "#eb8b2a", "#f14725"]);

export default function calculateColor(riskScore) {
  let riskLevel;
  if (riskScore >= 0 && riskScore < 0.1) riskLevel = "Minimal";
  else if (riskScore >= 0.1 && riskScore < 0.3) riskLevel = "Moderate";
  else if (riskScore >= 0.3 && riskScore < 0.5) riskLevel = "Moderate High";
  else if (riskScore >= 0.5 && riskScore <= 1) riskLevel = "High";

  console.log("Risk Level:", riskLevel); // Check the riskLevel

  const color = colorScale(riskLevel);
  console.log("Color from colorScale:", color); // Check the color from colorScale

  const textColor =
    riskLevel === "Moderate High" || riskLevel === "High" ? "white" : "black";
  return [color, textColor];
}
