import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Typography, Box } from "@mui/material";
import { color } from "../Utils/Calculator";

const PredictedLos = ({ patient, patientData, los }) => {
  const lengthOfStayEstimate = patient.lengthOfStayEstimate;
  const lengthOfStayRange = patient.lengthOfStayRange;
  const lengthOfStay = patient.lengthOfStay;
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 700;
    const height = 150;
    const margin = { top: 20, right: 30, bottom: 40, left: 30 };

    const arrowOffset = 20;
    const xOffset = -20;

    const xScale = d3
      .scaleLinear()
      .domain([0, 21])
      .range([0, width - margin.left - margin.right - arrowOffset]);

    const addTransparency = (hexColor, alpha) => {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const rangeColors = {
      shortLoS: addTransparency(color.minimal.risk, 0.5),
      AvgLoS: addTransparency(color.moderateHigh.risk, 0.5),
      ProlongedLoS: addTransparency(color.high.risk, 0.5),
    };

    const dotColors = {
      shortLoS: color.minimal.line,
      AvgLoS: color.moderateHigh.line,
      ProlongedLoS: color.high.line,
    };

    const textColors = {
      shortLoS: color.minimal.accent,
      AvgLoS: color.moderateHigh.accent,
      ProlongedLoS: color.high.accent,
    };

    const getRangeHighlight = () => {
      switch (lengthOfStayRange) {
        case "shortLoS":
          return [0, 6];
        case "AvgLoS":
          return [6, 14];
        case "ProlongedLoS":
          return [14, 21];
        default:
          return [0, 0];
      }
    };

    const [highlightStart, highlightEnd] = getRangeHighlight();

    const yPos = height / 2;

    const cappedEstimate = Math.min(lengthOfStayEstimate, 21);
    const arrowX = xOffset + margin.left + xScale(cappedEstimate);
    if (los === "los1") {
      svg
        .append("rect")
        .attr("x", xOffset + margin.left + xScale(highlightStart))
        .attr("y", yPos - 20)
        .attr("width", xScale(highlightEnd) - xScale(highlightStart))
        .attr("height", 40)
        .attr("fill", rangeColors[lengthOfStayRange]);

      svg
        .append("line")
        .attr("x1", xOffset + margin.left)
        .attr("x2", xOffset + margin.left + xScale(6))
        .attr("y1", yPos)
        .attr("y2", yPos)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      svg
        .append("line")
        .attr("x1", xOffset + margin.left + xScale(6))
        .attr("x2", xOffset + margin.left + xScale(14))
        .attr("y1", yPos)
        .attr("y2", yPos)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "6 3");

      svg
        .append("line")
        .attr("x1", xOffset + margin.left + xScale(14))
        .attr("x2", xOffset + width - margin.right - arrowOffset)
        .attr("y1", yPos)
        .attr("y2", yPos)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      svg
        .append("polygon")
        .attr(
          "points",
          `${xOffset + width - margin.right - arrowOffset},${yPos - 8} ${
            xOffset + width - margin.right - arrowOffset
          },${yPos + 8} ${xOffset + width - margin.right},${yPos}`
        )
        .attr("fill", "black");

      svg
        .append("line")
        .attr("x1", xOffset + margin.left + xScale(6))
        .attr("x2", xOffset + margin.left + xScale(6))
        .attr("y1", yPos - 15)
        .attr("y2", yPos + 15)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      svg
        .append("line")
        .attr("x1", xOffset + margin.left + xScale(14))
        .attr("x2", xOffset + margin.left + xScale(14))
        .attr("y1", yPos - 15)
        .attr("y2", yPos + 15)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      svg
        .append("text")
        .attr("x", xOffset + margin.left + xScale(6))
        .attr("y", yPos - 25)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("day 6");

      svg
        .append("text")
        .attr("x", xOffset + margin.left + xScale(14))
        .attr("y", yPos - 25)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("day 14");

      svg
        .append("line")
        .attr("x1", arrowX)
        .attr("x2", arrowX)
        .attr("y1", yPos)
        .attr("y2", yPos + 35)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      svg
        .append("polygon")
        .attr(
          "points",
          `${arrowX - 6},${yPos + 35} ${arrowX + 6},${yPos + 35} ${arrowX},${
            yPos + 42
          }`
        )
        .attr("fill", "black");

      svg
        .append("text")
        .attr("x", arrowX)
        .attr("y", yPos + 60)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text(`Predicted days in the ICU: ${lengthOfStayEstimate}`);
    } else if (los === "los2") {
      const width = 700;
      const height = 200;
      const margin = { top: 20, right: 30, bottom: 40, left: 50 };

      const xScale = d3
        .scaleLinear()
        .domain([0, 21])
        .range([margin.left, width - margin.right]);

      const yScale = d3
        .scaleLinear()
        .domain([0, 0.2])
        .range([height - margin.bottom, margin.top]);

      const generateNormalDist = (mean, std) => {
        return Array.from({ length: 100 }, (_, i) => {
          const x = i * 0.21;
          const y =
            (1 / (std * Math.sqrt(2 * Math.PI))) *
            Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
          return { x, y };
        });
      };

      const dist = generateNormalDist(10, 3);

      const line = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))
        .curve(d3.curveBasis);

      const predictionStart = xScale(patient.lengthOfStay.low);
      const predictionEnd = xScale(patient.lengthOfStay.high);

      const yAxisBottom = height - margin.bottom;

      const cappedHighBound = Math.min(patient.lengthOfStay.high, 21);
      const actualHighBound = patient.lengthOfStay.high;

      svg
        .append("rect")
        .attr("x", predictionStart)
        .attr("y", yAxisBottom - 7)
        .attr("width", xScale(cappedHighBound) - predictionStart)
        .attr("height", 12)
        .attr("fill", rangeColors[patient.lengthOfStayRange])
        .attr("stroke", "none");

      // Add text for range with actual high bound if over 21
      if (actualHighBound > 21) {
        svg
          .append("text")
          .style("font-size", "12px")
          .style("font-weight", "bold")
          .attr(
            "x",
            predictionStart + (xScale(cappedHighBound) - predictionStart) / 2
          )
          .attr("y", height - margin.bottom + 30)
          .attr("text-anchor", "middle")
          .attr("fill", textColors[patient.lengthOfStayRange])
          .text(`${patient.lengthOfStay.low}-${actualHighBound} days*`);
      }
      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .append("text")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .attr("x", width / 2)
        .attr("y", 45)
        .attr("fill", "black")
        .text("Days");

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).tickFormat((d) => Math.round(d * 100)))
        .append("text")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .attr("transform", "rotate(-90)")
        .attr("y", -30)
        .attr("x", -(height / 2))
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text("Cases in Cohort");

      svg
        .append("path")
        .datum(dist)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Inside los2 section:
      const cappedEstimate = Math.min(patient.lengthOfStayEstimate, 21);
      const actualEstimate = patient.lengthOfStayEstimate;

      svg
        .append("circle")
        .attr("cx", xScale(cappedEstimate))
        .attr("cy", yAxisBottom)
        .attr("r", 5)
        .attr("fill", dotColors[patient.lengthOfStayRange])
        // .attr("stroke", "white")
        .attr("stroke-width", 1);

      // Add actual estimate if over 21
      if (actualEstimate > 21) {
        svg
          .append("text")
          .style("font-size", "12px")
          .style("font-weight", "bold")
          .attr("x", xScale(21))
          .attr("y", yAxisBottom - 15)
          .attr("text-anchor", "middle")
          .attr("fill", dotColors[patient.lengthOfStayRange])

          .text(`${actualEstimate} days`);
      }
      svg
        .append("text")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .attr("x", predictionStart + (predictionEnd - predictionStart) / 2)
        .attr("y", height - margin.bottom + 30)
        .attr("text-anchor", "middle")
        .attr("fill", textColors[patient.lengthOfStayRange])
        .text(`${patient.lengthOfStay.low}-${patient.lengthOfStay.high} days*`);

      svg
        .append("text")
        .attr("x", margin.left)
        .attr("y", height - 5)
        .attr("fill", textColors[patient.lengthOfStayRange])
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .text(
          `*${Math.round(patient.lengthOfStay.confidence * 100)}% confidence`
        );
    }
  }, [lengthOfStayEstimate, lengthOfStayRange, patient, patientData, los]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        textAlign: "center",
        flexDirection: "row",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
        }}
      >
        Predicted Length of Stay
      </Typography>

      <svg
        ref={svgRef}
        width="750"
        height={los === "los2" ? "200" : "150"}
        viewBox={`0 0 750 ${los === "los2" ? "200" : "150"}`}
        preserveAspectRatio="xMidYMid meet"
      />
    </Box>
  );
};

export default PredictedLos;
