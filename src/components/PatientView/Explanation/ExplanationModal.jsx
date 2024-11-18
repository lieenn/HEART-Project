import React from "react";
import { Typography, Box } from "@mui/material";
import SvgRectangle from "../../SharedComponents/SvgRectangle";
import { calculateRisk } from "../../Utils/Calculator";
import RiskScale from "../RiskScale";
import PredictionBox from "./PredictionBox";

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
      <RiskScale
        adverseEvent={risk}
        riskRange={riskRange}
        isHighRisk={isHighRisk}
        isModal={true}
      />
      <PredictionBox adverseEvent={risk} />
    </>
  );
}
