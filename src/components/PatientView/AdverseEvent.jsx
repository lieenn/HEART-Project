import React from "react";
import { calculateColor, calculateRisk } from "../Utils/Calculator";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, IconButton, Avatar } from "@mui/material";
import RiskScale from "./RiskScale";
import SvgRectangle from "../SvgRectangle";

export default function AdverseEvent({ adverseEvent, riskRange }) {
  const rectWidth = 205;
  const rectHeight = 36;
  const riskLevel = calculateRisk(adverseEvent.riskScore, riskRange);
  const lowRiskDomain = [0, riskRange[0]];
  const highRiskDomain = [riskRange[0], riskRange[3]];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Box sx={{ flexShrink: 0, mr: 3 }}>
        <SvgRectangle
          risk={adverseEvent}
          riskRange={riskRange}
          width={rectWidth}
          height={rectHeight}
          text={adverseEvent.title}
          textAnchor="start" // Align text to the left
        >
          {/* Question mark button */}
          <foreignObject
            x={rectWidth - 32}
            y="5"
            width="40"
            height={rectHeight}
          >
            <Avatar
              size="small"
              sx={{ width: 24, height: 24, bgcolor: "#414bb2" }}
            >
              <IconButton
                aria-label="question"
                size="small"
                sx={{ color: "white" }}
              >
                <QuestionMarkIcon fontSize="inherit" />
              </IconButton>
            </Avatar>
          </foreignObject>
        </SvgRectangle>
      </Box>
      {riskLevel === "Minimal" ? (
        <Box sx={{ ml: -3.2 }}>
          <RiskScale
            adverseEvent={adverseEvent}
            domain={lowRiskDomain}
            isHighRisk={false}
            riskRange={riskRange}
          />
        </Box>
      ) : (
        <RiskScale
          adverseEvent={adverseEvent}
          domain={highRiskDomain}
          isHighRisk={true}
          riskRange={riskRange}
        />
      )}
    </Box>
  );
}
