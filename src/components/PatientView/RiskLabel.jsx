import { Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { calculateColor, color } from "../Utils/Calculator";

export default function RiskLabel({
  adverseEvent,
  isHighRisk,
  isModal,
  riskLabel,
  riskRange,
}) {
  const isLabel1 = riskLabel === "label1";
  const d3Container = useRef(null);

  const [textColor, main, riskColor, line] = calculateColor(
    adverseEvent.riskScore,
    riskRange
  );

  useEffect(() => {
    if (
      !isLabel1 &&
      d3Container.current &&
      adverseEvent?.uncertaintyRange?.low !== undefined
    ) {
      d3.select(d3Container.current).selectAll("*").remove();

      const width = 200;
      const height = 50;
      const margin = { top: 20, right: 20, bottom: 20, left: 20 };

      const svg = d3
        .select(d3Container.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const scale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([margin.left, width - margin.right]);

      const absoluteRiskPercent = Math.round(adverseEvent.absoluteRisk * 100);
      const lowPercent = Math.round(adverseEvent.uncertaintyRange.low * 100);
      const highPercent = Math.round(adverseEvent.uncertaintyRange.high * 100);

      // Add uncertainty range box
      const boxHeight = 16;
      svg
        .append("rect")
        .attr("x", scale(lowPercent))
        .attr("y", height / 2 - boxHeight / 2)
        .attr("width", scale(highPercent) - scale(lowPercent))
        .attr("height", boxHeight)
        .attr("fill", riskColor);
      // .attr("rx", 2)
      // .attr("ry", 2);

      // Create horizontal line
      svg
        .append("line")
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
        .attr("y1", height / 2)
        .attr("y2", height / 2)
        .attr("stroke", "black")
        .attr("stroke-width", 1.5);

      // Add circle marker
      svg
        .append("circle")
        .attr("cx", scale(absoluteRiskPercent))
        .attr("cy", height / 2)
        .attr("r", 3)
        .attr("fill", "black");

      // Add risk text
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", margin.top - 6)
        .attr("text-anchor", "middle")
        .attr("font-family", "Arial")
        .attr("font-weight", "bold")
        .attr("font-size", "12px")
        .text(`Risk:${absoluteRiskPercent}% [${lowPercent}-${highPercent}]`);

      svg
        .selectAll("circle")
        .on("mouseover", function () {
          d3.select(this).transition().duration(200).attr("r", 6);
        })
        .on("mouseout", function () {
          d3.select(this).transition().duration(200).attr("r", 4);
        });
    }
  }, [isLabel1, adverseEvent, riskRange]);

  if (
    !isLabel1 &&
    (!adverseEvent?.uncertaintyRange?.low ||
      !adverseEvent?.uncertaintyRange?.high)
  ) {
    return null;
  }

  return isLabel1 ? (
    <Typography
      fontWeight="bold"
      color="black"
      sx={{ mt: isHighRisk ? 1 : 0, ml: !isHighRisk && !isModal ? 3 : 0 }}
    >
      Risk:{" "}
      {adverseEvent?.riskScore ? Math.round(adverseEvent.riskScore * 100) : 0}%
    </Typography>
  ) : (
    <div
      ref={d3Container}
      style={{
        marginTop: isHighRisk ? 0 : "-8px",
        // marginLeft: !isHighRisk && !isModal ? "24px" : 0,
      }}
    />
  );
}
