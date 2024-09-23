import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Typography, Box } from "@mui/material";

const PredictedLosD3 = ({ lengthOfStayEstimate, lengthOfStayRange }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const width = 600;
    const height = 120; // Reduced height
    const margin = { top: 10, right: 20, bottom: 30, left: 20 }; // Adjusted margins

    const arrowOffset = 15;
    const xOffset = 50; // Reduced offset to move everything slightly to the right

    // X scale for days (0 to 21 days)
    const xScale = d3
      .scaleLinear()
      .domain([0, 21])
      .range([0, width - margin.left - margin.right - arrowOffset]);

    const rangeColors = {
      shortLoS: "rgba(148, 195, 244, 0.5)",
      AvgLoS: "rgba(255, 250, 159, 0.5)",
      ProlongedLoS: "rgba(237, 158, 138, 0.5)",
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

    const yPos = height / 2; // Centered vertically

    const cappedEstimate = Math.min(lengthOfStayEstimate, 21);
    const arrowX = xOffset + margin.left + xScale(cappedEstimate);

    // Highlight the appropriate range
    svg
      .append("rect")
      .attr("x", xOffset + margin.left + xScale(highlightStart))
      .attr("y", yPos - 15)
      .attr("width", xScale(highlightEnd) - xScale(highlightStart))
      .attr("height", 30)
      .attr("fill", rangeColors[lengthOfStayRange]);

    // Add the timeline (solid for first 6 days)
    svg
      .append("line")
      .attr("x1", xOffset + margin.left)
      .attr("x2", xOffset + margin.left + xScale(6))
      .attr("y1", yPos)
      .attr("y2", yPos)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Add the timeline (dashed for 6 to 14 days)
    svg
      .append("line")
      .attr("x1", xOffset + margin.left + xScale(6))
      .attr("x2", xOffset + margin.left + xScale(14))
      .attr("y1", yPos)
      .attr("y2", yPos)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4 2");

    // Add the timeline (solid for day 14 onwards)
    svg
      .append("line")
      .attr("x1", xOffset + margin.left + xScale(14))
      .attr("x2", xOffset + width - margin.right - arrowOffset)
      .attr("y1", yPos)
      .attr("y2", yPos)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Arrow at the far right
    svg
      .append("polygon")
      .attr(
        "points",
        `${xOffset + width - margin.right - arrowOffset},${yPos - 6} ${
          xOffset + width - margin.right - arrowOffset
        },${yPos + 6} ${xOffset + width - margin.right},${yPos}`
      )
      .attr("fill", "black");

    // Add day markers (day 6 and day 14)
    svg
      .append("line")
      .attr("x1", xOffset + margin.left + xScale(6))
      .attr("x2", xOffset + margin.left + xScale(6))
      .attr("y1", yPos - 10)
      .attr("y2", yPos + 10)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    svg
      .append("line")
      .attr("x1", xOffset + margin.left + xScale(14))
      .attr("x2", xOffset + margin.left + xScale(14))
      .attr("y1", yPos - 10)
      .attr("y2", yPos + 10)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Add day 6 and day 14 labels above the timeline
    svg
      .append("text")
      .attr("x", xOffset + margin.left + xScale(6))
      .attr("y", yPos - 20)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .text("day 6");

    svg
      .append("text")
      .attr("x", xOffset + margin.left + xScale(14))
      .attr("y", yPos - 20)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .text("day 14");

    // Add the vertical arrow
    svg
      .append("line")
      .attr("x1", arrowX)
      .attr("x2", arrowX)
      .attr("y1", yPos)
      .attr("y2", yPos + 30)
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    // Arrowhead for vertical arrow
    svg
      .append("polygon")
      .attr(
        "points",
        `${arrowX - 4},${yPos + 30} ${arrowX + 4},${yPos + 30} ${arrowX},${
          yPos + 35
        }`
      )
      .attr("fill", "black");

    // Add the predicted days label
    svg
      .append("text")
      .attr("x", arrowX)
      .attr("y", yPos + 50)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
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
        width="600"
        height="120"
        viewBox="0 0 700 120"
        preserveAspectRatio="xMidYMid meet"
      />
    </Box>
  );
};

export default PredictedLosD3;
