import React from "react";
import calculateColor from "../Utils/colorScale";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
export default function AdverseEvent({ adverseEvent }) {
  const recWidth = 200;
  const recHeight = 32;

  const [color, textColor] = calculateColor(adverseEvent.riskScore);

  return (
    <div>
      <svg width={recWidth} height={recHeight}>
        <rect
          width={recWidth}
          height={recHeight}
          fill={color}
          stroke="black"
          strokeWidth="4px"
        />
        <text
          x="10" // Position text from the left edge
          y="55%" // Vertically center text
          dominantBaseline="middle"
          fontSize="16"
          fontFamily="Roboto"
          fontWeight="500"
          fill={textColor}
        >
          {adverseEvent.title}
        </text>
        <foreignObject x={recWidth - 35} y="-5" width="40" height={recHeight}>
          <IconButton
            aria-label="delete"
            size="medium"
            sx={{ color: textColor }}
          >
            <HelpIcon fontSize="inherit" />
          </IconButton>
        </foreignObject>
      </svg>
    </div>
  );
}
