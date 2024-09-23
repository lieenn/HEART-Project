import React from "react";
import { calculateColor, calculateRisk } from "../Utils/Calculator";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, IconButton, Avatar } from "@mui/material";
import RiskScale from "./RiskScale";
import SvgRectangle from "../SharedComponents/SvgRectangle";
import ExplanationButton from "./Explanation/ExplanationButton";

export default function AdverseEvent({ adverseEvent, riskRange }) {
  const rectWidth = 216;
  const rectHeight = 36;
  const riskLevel = calculateRisk(adverseEvent.riskScore, riskRange);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <Box sx={{ flexShrink: 0, mr: 3 }}>
        <SvgRectangle
          risk={adverseEvent}
          riskRange={riskRange}
          width={rectWidth}
          height={rectHeight}
          text={adverseEvent.title}
          isPatientSpecific={true}
        >
          <ExplanationButton risk={adverseEvent} riskRange={riskRange} />
        </SvgRectangle>
      </Box>
      {riskLevel === "Minimal" ? (
        <Box sx={{ ml: -3.2 }}>
          <RiskScale
            adverseEvent={adverseEvent}
            isHighRisk={false}
            riskRange={riskRange}
          />
        </Box>
      ) : (
        <RiskScale
          adverseEvent={adverseEvent}
          isHighRisk={true}
          riskRange={riskRange}
        />
      )}
    </Box>
  );
}
