import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Typography, Box } from "@mui/material";

const PredictedLosD3 = ({ lengthOfStayEstimate, lengthOfStayRange }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const width = 500; // Increase the width
    const height = 150; // Increase the height for more space
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // X scale for days (0 to 21 days)
    const xScale = d3.scaleLinear().domain([0, 21]).range([0, width]);

    // Arrowhead width (reduce the highlight before this point)
    const arrowOffset = 40; // Increase this value to shorten the box further

    // Colors for different LoS ranges
    const rangeColors = {
      shortLoS: "rgba(148, 195, 244, 0.5)", // Light Blue
      AvgLoS: "rgba(255, 250, 159, 0.5)", // Yellow
      ProlongedLoS: "rgba(237, 158, 138, 0.5)", // Red
    };

    const getRangeHighlight = () => {
      switch (lengthOfStayRange) {
        case "shortLoS":
          return [0, 6]; // Highlight 0 to 6 days
        case "AvgLoS":
          return [6, 14]; // Highlight 6 to 14 days
        case "ProlongedLoS":
          return [14, 21]; // Highlight 14 to 21 days
        default:
          return [0, 0];
      }
    };

    const [highlightStart, highlightEnd] = getRangeHighlight();

    // Add the timeline (solid for first 6 days)
    svg
      .append("line")
      .attr("x1", margin.left)
      .attr("x2", margin.left + xScale(6))
      .attr("y1", height / 2)
      .attr("y2", height / 2)
      .attr("stroke", "black")
      .attr("stroke-width", 3); // Make the line thicker

    // Add the timeline (dashed for 6 to 14 days)
    svg
      .append("line")
      .attr("x1", margin.left + xScale(6))
      .attr("x2", margin.left + xScale(14))
      .attr("y1", height / 2)
      .attr("y2", height / 2)
      .attr("stroke", "black")
      .attr("stroke-width", 3) // Make the dashed line thicker
      .attr("stroke-dasharray", "6 4"); // Adjust the dash length

    // Add the timeline (solid for day 14 onwards)
    svg
      .append("line")
      .attr("x1", margin.left + xScale(14))
      .attr("x2", width - margin.right) // Extend the line slightly
      .attr("y1", height / 2)
      .attr("y2", height / 2)
      .attr("stroke", "black")
      .attr("stroke-width", 3); // Make the line thicker

    // Arrow at the far right
    svg
      .append("polygon")
      .attr(
        "points",
        `${width - margin.right},${height / 2 - 8} ${width - margin.right},${
          height / 2 + 8
        } ${width - margin.right + 12},${height / 2}`
      )
      .attr("fill", "black");

    // Highlight the appropriate range, adjust for arrow offset in ProlongedLoS
    svg
      .append("rect")
      .attr("x", margin.left + xScale(highlightStart))
      .attr("y", height / 2 - 15)
      .attr(
        "width",
        lengthOfStayRange === "ProlongedLoS"
          ? xScale(highlightEnd) - xScale(highlightStart) - arrowOffset // Adjust for arrow overlap
          : xScale(highlightEnd) - xScale(highlightStart)
      )
      .attr("height", 30) // Adjust the height for better visibility
      .attr("fill", rangeColors[lengthOfStayRange]);

    // Add day markers (day 6 and day 14)
    svg
      .append("line")
      .attr("x1", margin.left + xScale(6))
      .attr("x2", margin.left + xScale(6))
      .attr("y1", height / 2 - 15)
      .attr("y2", height / 2 + 15)
      .attr("stroke", "black")
      .attr("stroke-width", 3); // Thicker marker

    svg
      .append("line")
      .attr("x1", margin.left + xScale(14))
      .attr("x2", margin.left + xScale(14))
      .attr("y1", height / 2 - 15)
      .attr("y2", height / 2 + 15)
      .attr("stroke", "black")
      .attr("stroke-width", 3); // Thicker marker

    // Add day 6 and day 14 labels
    // Add day 6 and day 14 labels above the timeline
    svg
      .append("text")
      .attr("x", margin.left + xScale(6))
      .attr("y", height / 2 - 28) // Move this above the line by adjusting the y-coordinate
      .attr("text-anchor", "middle")
      .text("day 6");

    svg
      .append("text")
      .attr("x", margin.left + xScale(14))
      .attr("y", height / 2 - 28) // Move this above the line by adjusting the y-coordinate
      .attr("text-anchor", "middle")
      .text("day 14");

    // Add the arrow for the predicted day
    const predictedX = margin.left + xScale(lengthOfStayEstimate);

    svg
      .append("line")
      .attr("x1", predictedX)
      .attr("x2", predictedX)
      .attr("y1", height / 2) // Start the vertical line exactly at the horizontal line's y-position
      .attr("y2", height / 2 + 55) // Extend the vertical line to touch the arrowhead
      .attr("stroke", "black")
      .attr("stroke-width", 2); // Thicker arrow line

    // Arrowhead
    svg
      .append("polygon")
      .attr(
        "points",
        `${predictedX - 8},${height / 2 + 55} ${predictedX + 8},${
          height / 2 + 55
        } ${predictedX},${height / 2 + 65}`
      )
      .attr("fill", "black");

    // Add the predicted days label
    svg
      .append("text")
      .attr("x", predictedX)
      .attr("y", height / 2 + 88)
      .attr("text-anchor", "middle")
      .style("font-weight", "bold") // Make the text bold
      .text(`Predicted days in the ICU: ${lengthOfStayEstimate}`);
  }, [lengthOfStayEstimate, lengthOfStayRange]);

  return (
    <Box
      sx={{
        display: "flex", // Flexbox for horizontal layout
        alignItems: "center", // Vertically center the content
        justifyContent: "center", // Center the content horizontally
        width: "100%", // Ensure the container takes full width
        textAlign: "center", // Center text within the box
        flexDirection: "column", // Stack the text and SVG vertically
      }}
    >
      {/* Typography for Predicted Length of Stay */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          marginBottom: "0px", // Decrease the margin-bottom to reduce space
        }}
      >
        Predicted Length of Stay
      </Typography>

      {/* SVG Container */}
      <svg ref={svgRef} width="500" height="180" />
    </Box>
  );
};

export default PredictedLosD3;
