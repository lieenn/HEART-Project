import React from "react";
import { calculateColor, calculateRisk } from "../Utils/Calculator";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import RiskScaleHigh from "./RiskScaleHigh";
import RiskScaleLow from "./RiskScaleLow";

export default function AdverseEvent({ adverseEvent }) {
  const recWidth = 208;
  const recHeight = 36;

  const [textColor, color] = calculateColor(adverseEvent.riskScore);

  const riskLevel = calculateRisk(adverseEvent.riskScore);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Box sx={{ flexShrink: 0, mr: 3 }}>
        <svg width={recWidth} height={recHeight}>
          <rect
            width={recWidth}
            height={recHeight}
            fill={color}
            stroke="black"
            strokeWidth="6px"
          />
          <text
            x="10"
            y="55%"
            dominantBaseline="middle"
            fontSize="16"
            fontFamily="Roboto"
            fontWeight="500"
            fill={textColor}
          >
            {adverseEvent.title}
          </text>
          <foreignObject x={recWidth - 32} y="6" width="40" height={recHeight}>
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
        </svg>
      </Box>
      {riskLevel === "Minimal" ? (
        <RiskScaleLow adverseEvent={adverseEvent} />
      ) : (
        <RiskScaleHigh adverseEvent={adverseEvent} />
      )}
    </Box>
  );
}
