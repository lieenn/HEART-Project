import * as d3 from "d3";
import { FilterUnwantedAdverse } from "./FilterFunctions";
import { riskRange } from "../../App";

// Central color configuration
export const color = {
  minimal: {
    main: "#d0e7fe",
    risk: "#d0e7fe",
    line: "#5aabfa",
    accent: "#99cdf6",
    text: "black",
  },
  moderate: {
    main: "#fcf2b6",
    risk: "#fcf2b6",
    line: "#ffd900",
    accent: "#ffea6f",
    text: "black",
  },
  moderateHigh: {
    main: "#f5bc93",
    risk: "#f5bc93",
    line: "#ff7700",
    accent: "#f7924a",
    text: "black",
  },
  high: {
    main: "#ffadaa",
    risk: "#ffadaa",
    line: "#fa2205",
    accent: "#fc716c",
    text: "black",
  },
};

// const color = {
//   minimal: {
//     main: "#99cdf6",
//     risk: "#d0e7fe",
//     line: "#5aabfa",
//     accent: "#99cdf6",
//     text: "black",
//   },
//   moderate: {
//     main: "#ffea6f",
//     risk: "#fcf2b6",
//     line: "#ffd900",
//     accent: "#ffea6f",
//     text: "black",
//   },
//   moderateHigh: {
//     main: "#f7924a",
//     risk: "#f5bc93",
//     line: "#ff7700",
//     accent: "#f7924a",
//     text: "white",
//   },
//   high: {
//     main: "#fc716c",
//     risk: "#ffadaa",
//     line: "#fa2205",
//     accent: "#fc716c",
//     text: "white",
//   },
// };

// #ff624f
// #E23D28 --> alternative color -- cute chili red -- but needs white font
// #97C5F6 --> light blue
// #99cdf6
// #b1d6fa

/**
 * Using d3 to define color scale,
 * ordinal so there is no gradient.
 * Each risk level maps to an array of three colors: [main, risk].
 */
export const colorScale = d3
  .scaleOrdinal()
  .domain(["Minimal", "Moderate", "Moderate High", "High"])
  .range([
    [
      color.minimal.main,
      color.minimal.risk,
      color.minimal.line,
      color.minimal.accent,
    ],
    [
      color.moderate.main,
      color.moderate.risk,
      color.moderate.line,
      color.moderate.accent,
    ],
    [
      color.moderateHigh.main,
      color.moderateHigh.risk,
      color.moderateHigh.line,
      color.moderateHigh.accent,
    ],
    [color.high.main, color.high.risk, color.high.line, color.high.accent],
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

export function calculateBorderline(riskScore, riskRange) {
  const riskLevel = calculateRisk(riskScore, riskRange);

  if (riskLevel === "Minimal") return [];

  switch (riskLevel) {
    case "Moderate":
      return [colorScale("Moderate")[1]];
    case "Moderate High":
      return [colorScale("Moderate")[1], colorScale("Moderate High")[1]];
    case "High":
      return [
        colorScale("Moderate")[1],
        colorScale("Moderate High")[1],
        colorScale("High")[1],
      ];
    default:
      return [];
  }
}

/**
 * Get the main colors corresponding to the
 * highest risk score among a patient's adverse events
 * @param {Object} patient - The patient object containing adverse events
 * @param {Array<Object>} patient.adverseEvents - Array of adverse events
 * @param {Array<number>} riskRange - The current risk range used to define levels.
 * @returns {string} main color
 */
export function highestRiskColor(patient, riskRange) {
  const risks = patient.adverseEvents;
  const filteredRisks = FilterUnwantedAdverse(risks);
  const highestRisk = Math.max(
    ...filteredRisks.map((event) => event.riskScore),
    0
  );

  const [textColor, main, risk, line, accent] = calculateColor(
    highestRisk,
    riskRange
  );
  return accent;
}
