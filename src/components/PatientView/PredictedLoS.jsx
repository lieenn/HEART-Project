import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Typography, Box } from "@mui/material";
import { color } from "../Utils/Calculator";

const PredictedLosD3 = ({ lengthOfStayEstimate, lengthOfStayRange }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 700;
    const height = 150;
    const margin = { top: 20, right: 30, bottom: 40, left: 30 };

    const arrowOffset = 20;
    const xOffset = -20;

    // X scale for days (0 to 21 days)
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
      AvgLoS: addTransparency(color.moderate.risk, 0.5),
      ProlongedLoS: addTransparency(color.high.risk, 0.5),
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

    // Highlight the appropriate range
    svg
      .append("rect")
      .attr("x", xOffset + margin.left + xScale(highlightStart))
      .attr("y", yPos - 20)
      .attr("width", xScale(highlightEnd) - xScale(highlightStart))
      .attr("height", 40)
      .attr("fill", rangeColors[lengthOfStayRange]);

    // Timeline with adjusted stroke width
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

    // Larger arrow at the far right
    svg
      .append("polygon")
      .attr(
        "points",
        `${xOffset + width - margin.right - arrowOffset},${yPos - 8} ${
          xOffset + width - margin.right - arrowOffset
        },${yPos + 8} ${xOffset + width - margin.right},${yPos}`
      )
      .attr("fill", "black");

    // Day markers with adjusted stroke width
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

    // Day labels
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

    // Vertical arrow with adjusted stroke width
    svg
      .append("line")
      .attr("x1", arrowX)
      .attr("x2", arrowX)
      .attr("y1", yPos)
      .attr("y2", yPos + 35)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Arrowhead
    svg
      .append("polygon")
      .attr(
        "points",
        `${arrowX - 6},${yPos + 35} ${arrowX + 6},${yPos + 35} ${arrowX},${
          yPos + 42
        }`
      )
      .attr("fill", "black");

    // Predicted days label
    svg
      .append("text")
      .attr("x", arrowX)
      .attr("y", yPos + 60)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(`Predicted days in the ICU: ${lengthOfStayEstimate}`);
  }, [lengthOfStayEstimate, lengthOfStayRange]);

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
        height="150"
        viewBox="0 0 750 150"
        preserveAspectRatio="xMidYMid meet"
      />
    </Box>
  );
};

export default PredictedLosD3;
