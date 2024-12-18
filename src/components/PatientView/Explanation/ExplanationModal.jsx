import React from "react";
import { Typography, Box } from "@mui/material";
import SvgRectangle from "../../SharedComponents/SvgRectangle";
import { calculateRisk } from "../../Utils/Calculator";
import RiskScale from "../RiskScale";
import PredictionBox from "./PredictionBox";
import RiskLabel from "../RiskLabel";

export default function ExplanationModal({ risk, riskRange }) {
  const title = calculateRisk(risk.riskScore, riskRange);
  const isHighRisk = title !== "Minimal";
  return (
    <>
      <SvgRectangle
        risk={risk}
        riskRange={riskRange}
        width="100%"
        height={36}
        // text={`${risk.title}`}
        text={`${title} Risk of ${risk.title}`}
        textAlign="center"
        isPatientSpecific={true}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 3 }}>
        <RiskScale
          adverseEvent={risk}
          riskRange={riskRange}
          isHighRisk={isHighRisk}
          isModal={true}
        />
        <RiskLabel
          adverseEvent={risk}
          isHighRisk={isHighRisk}
          isModal={true}
          riskLabel="label1"
          riskRange={riskRange}
        />
      </Box>
      <PredictionBox adverseEvent={risk} />
    </>
  );
}
