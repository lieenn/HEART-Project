import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Typography, Box, CardHeader, CardContent } from "@mui/material";
import { color } from "../Utils/Calculator";
import distributionData from "../../SampleData/losData.json";

const PredictedLos = ({ patient, los }) => {
  const { lengthOfStayEstimate, lengthOfStayRange } = patient;
  const svgRef = useRef();

  const createDistributionVis = (svg, options) => {
    const {
      height,
      margin,
      width,
      bins,
      rangeColors,
      dotColors,
      xScale,
      yScale,
      patient,
      tooltip,
    } = options;

    const yAxisBottom = height - margin.bottom;

    // Draw segments for los3
    // In the createDistributionVis function, replace the color mapping:

    if (los === "los3") {
      const segments = [
        { start: 0, end: 3, label: "blue" },
        { start: 3, end: 6, label: "yell" },
        { start: 6, end: 14, label: "orn" },
        { start: 14, end: 21, label: "red" },
      ];

      // Regular numeric axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .style("font-size", "16px");

      // Add the colored segments
      segments.forEach((segment) => {
        svg
          .append("rect")
          .attr("x", xScale(segment.start))
          .attr("y", yAxisBottom - 20)
          .attr("width", xScale(segment.end) - xScale(segment.start))
          .attr("height", 20)
          .attr(
            "fill",
            segment.label === "blue"
              ? color.minimal.risk
              : segment.label === "yell"
              ? color.moderate.risk
              : segment.label === "orn"
              ? color.moderateHigh.risk
              : color.high.risk
          )
          .attr("stroke", "black")
          .attr("stroke-width", 1);
      });

      // Add horizontal range line
      const rangeStart = xScale(patient.lengthOfStay.low);
      const rangeEnd = xScale(Math.min(patient.lengthOfStay.high, 21));

      svg
        .append("line")
        .attr("x1", rangeStart)
        .attr("x2", rangeEnd)
        .attr("y1", yAxisBottom - 10) // Same height as the dot
        .attr("y2", yAxisBottom - 10)
        .attr("stroke", "black")
        .attr("stroke-width", 3);

      // Add small vertical lines at ends of range
      svg
        .append("line")
        .attr("x1", rangeStart)
        .attr("x2", rangeStart)
        .attr("y1", yAxisBottom - 13)
        .attr("y2", yAxisBottom - 7)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      svg
        .append("line")
        .attr("x1", rangeEnd)
        .attr("x2", rangeEnd)
        .attr("y1", yAxisBottom - 13)
        .attr("y2", yAxisBottom - 7)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
    } else {
      // Original prediction range rect for non-los3
      const predictionStart = xScale(patient.lengthOfStay.low);
      const cappedHighBound = Math.min(patient.lengthOfStay.high, 21);
      svg
        .append("rect")
        .attr("x", predictionStart)
        .attr("y", yAxisBottom - 7)
        .attr("width", xScale(cappedHighBound) - predictionStart)
        .attr("height", 12)
        .attr("fill", rangeColors[lengthOfStayRange])
        .attr("stroke", "none")
        .on("mouseover", (event) => {
          tooltip
            .style("visibility", "visible")
            .html(
              `${patient.lengthOfStay.low}-${patient.lengthOfStay.high} days*`
            )
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 10}px`);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 10}px`);
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });
    }

    // Draw line
    const lineData = bins
      .map((count, day) => ({ x: day, y: count }))
      .filter((d) => d.x <= 21);
    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveBasis);

    svg
      .append("path")
      .datum(lineData)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add axes and labels
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .style("font-size", "16px");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickFormat(d3.format("d")).ticks(5))
      .style("font-size", "16px");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Days");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.left - 40)
      .attr("x", -(height / 2))
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Number of Patients");

    // Add metadata
    const totalPatients = distributionData.reduce((sum, d) => sum + d.count, 0);
    svg
      .append("text")
      .attr("x", width - margin.right)
      .attr("y", margin.top)
      .attr("text-anchor", "end")
      .style("font-size", "14px")
      .text(`Total Patients: ${totalPatients}`);

    // Add confidence text with adjusted position for los3
    svg
      .append("text")
      .attr("x", margin.left)
      .attr(
        "y",
        los === "los3"
          ? height - margin.bottom + 90
          : height - margin.bottom + 60
      )
      .attr("fill", dotColors[lengthOfStayRange])
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(
        `*${Math.round(patient.lengthOfStay.confidence * 100)}% confidence`
      );

    // Add patient marker
    const cappedEstimate = Math.min(patient.lengthOfStayEstimate, 21);
    if (patient.lengthOfStayEstimate > 21) {
      // Draw right-pointing arrow at day 21
      if (los === "los3") {
        svg
          .append("path")
          .attr(
            "d",
            `M ${xScale(21)},${yAxisBottom - 16}
     L ${xScale(21) + 16},${yAxisBottom - 10}
     L ${xScale(21)},${yAxisBottom - 4}
     L ${xScale(21)},${yAxisBottom - 16}`
          )
          .attr("fill", "black");

        // Add exact prediction text above the arrow
        svg
          .append("text")
          .style("font-size", "14px")
          .style("font-weight", "bold")
          .attr("x", xScale(21) + 50)
          .attr("y", yAxisBottom - 5)
          .attr("text-anchor", "middle")
          .attr("fill", dotColors[lengthOfStayRange])
          .text(`${patient.lengthOfStayEstimate} days`);
      } else {
        svg
          .append("path")
          .attr(
            "d",
            `M ${xScale(21)},${yAxisBottom - 6}
         L ${xScale(21) + 16},${yAxisBottom}
         L ${xScale(21)},${yAxisBottom + 6}
         L ${xScale(21)},${yAxisBottom - 6}`
          )
          .attr("fill", dotColors[lengthOfStayRange]);

        // Add exact prediction text above the arrow
        svg
          .append("text")
          .style("font-size", "14px")
          .style("font-weight", "bold")
          .attr("x", xScale(21) + 50)
          .attr("y", yAxisBottom + 5)
          .attr("text-anchor", "middle")
          .attr("fill", dotColors[lengthOfStayRange])
          .text(`${patient.lengthOfStayEstimate} days`);
      }
    } else {
      if (los === "los2") {
        svg
          .append("circle")
          .attr("cx", xScale(cappedEstimate))
          .attr("cy", yAxisBottom)
          .attr("r", 5)
          .attr("fill", dotColors[lengthOfStayRange])
          .attr("stroke-width", 1);
      } else {
        svg
          .append("circle")
          .attr("cx", xScale(cappedEstimate))
          .attr("cy", yAxisBottom - 10)
          .attr("r", 5)
          .attr("fill", "black")
          .attr("stroke-width", 1);
      }
    }
  };

  const createLos1Vis = (svg, options) => {
    const { width, height, margin, rangeColors, xScale, patient, tooltip } =
      options;
    const yPos = height / 2;

    const highlightRanges = {
      shortLoS: [0, 6],
      AvgLoS: [6, 14],
      ProlongedLoS: [14, 21],
    };

    const [highlightStart, highlightEnd] = highlightRanges[lengthOfStayRange];

    // Draw highlight rectangle
    svg
      .append("rect")
      .attr("x", margin.left + xScale(highlightStart))
      .attr("y", yPos - 20)
      .attr("width", xScale(highlightEnd) - xScale(highlightStart))
      .attr("height", 40)
      .attr("fill", rangeColors[lengthOfStayRange])
      .on("mouseover", (event) => {
        tooltip
          .style("visibility", "visible")
          .html(
            `Range: ${patient.lengthOfStay.low}-${
              patient.lengthOfStay.high
            } days<br/>
                Confidence: ${Math.round(
                  patient.lengthOfStay.confidence * 100
                )}%`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 10}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    // Draw timeline segments
    svg
      .append("line")
      .attr("x1", margin.left)
      .attr("x2", margin.left + xScale(6))
      .attr("y1", yPos)
      .attr("y2", yPos)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    svg
      .append("line")
      .attr("x1", margin.left + xScale(6))
      .attr("x2", margin.left + xScale(14))
      .attr("y1", yPos)
      .attr("y2", yPos)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "6 3");

    svg
      .append("line")
      .attr("x1", margin.left + xScale(14))
      .attr("x2", width - margin.right - 20)
      .attr("y1", yPos)
      .attr("y2", yPos)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Add arrow at end
    svg
      .append("polygon")
      .attr(
        "points",
        `${width - margin.right - 20},${yPos - 8} ${
          width - margin.right - 20
        },${yPos + 8} ${width - margin.right},${yPos}`
      )
      .attr("fill", "black");

    // Add markers and labels
    [6, 14].forEach((day) => {
      svg
        .append("line")
        .attr("x1", margin.left + xScale(day))
        .attr("x2", margin.left + xScale(day))
        .attr("y1", yPos - 15)
        .attr("y2", yPos + 15)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      svg
        .append("text")
        .attr("x", margin.left + xScale(day))
        .attr("y", yPos - 25)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text(`day ${day}`);
    });

    // Add estimate marker
    const cappedEstimate = Math.min(lengthOfStayEstimate, 31);
    const arrowX = margin.left + xScale(cappedEstimate);

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
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("padding", "10px")
      .style("border-radius", "4px")
      .style("font-size", "14px")
      .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)");

    const width = 700;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const height = los === "los3" || los === "los2" ? 250 : 150;

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

    if (los === "los1") {
      createLos1Vis(svg, {
        width,
        height,
        margin,
        rangeColors,
        xScale: d3
          .scaleLinear()
          .domain([0, 21])
          .range([0, width - margin.left - margin.right - 20]),
        patient,
        tooltip,
      });
    } else {
      const distributionXScale = d3
        .scaleLinear()
        .domain([0, 21])
        .range([margin.left, width - margin.right]);

      // Initialize bins with zeros
      let bins = Array(32).fill(0);

      // Fill bins using the distribution data
      distributionData.forEach((d) => {
        const index = d["predicted los"];
        if (index >= 0 && index <= 31) {
          bins[index] = d.count;
        }
      });

      const yScale = d3
        .scaleLinear()
        .domain([0, Math.max(...bins)])
        .range([height - margin.bottom, margin.top]);

      createDistributionVis(svg, {
        height,
        margin,
        width,
        bins,
        rangeColors,
        dotColors,
        xScale: distributionXScale,
        yScale,
        patient,
        tooltip,
      });
    }

    return () => {
      d3.selectAll(".tooltip").remove();
    };
  }, [lengthOfStayEstimate, lengthOfStayRange, patient, los]);

  return (
    <>
      <CardHeader
        title={
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              border: 1,
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            Predicted Length of Stay
          </Typography>
        }
        sx={{ backgroundColor: "white", padding: 1 }}
      />
      <CardContent>
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
          <svg
            ref={svgRef}
            width="1200"
            height={los === "los3" || los === "los2" ? "300" : "150"}
            viewBox={`0 0 650 ${
              los === "los3" || los === "los2" ? "300" : "150"
            }`}
            preserveAspectRatio="xMidYMid meet"
          />
        </Box>
      </CardContent>
    </>
  );
};

export default PredictedLos;
