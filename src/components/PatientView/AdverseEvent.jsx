import React from "react";
import { calculateRisk } from "../Utils/Calculator";
import { Box, Grid } from "@mui/material";
import RiskScale from "./RiskScale";
import SvgRectangle from "../SharedComponents/SvgRectangle";
import ExplanationButton from "./Explanation/ExplanationButton";
import RiskLabel from "./RiskLabel";

export default function AdverseEvent({
  adverseEvent,
  riskRange,
  borderline,
  riskLabel,
  showUncertainty,
}) {
  const rectWidth = 216;
  const rectHeight = 36;
  const riskLevel = calculateRisk(adverseEvent.riskScore, riskRange);
  const isMinimalRisk = riskLevel === "Minimal";

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

      {isMinimalRisk ? (
        borderline === "borderline3" ? (
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <RiskScale
                adverseEvent={adverseEvent}
                isHighRisk={false}
                riskRange={riskRange}
                borderline={borderline}
                showUncertainty={showUncertainty}
              />
            </Grid>
            <Grid item xs={6}>
              <RiskLabel
                adverseEvent={adverseEvent}
                isHighRisk={false}
                isModal={false}
                riskLabel={riskLabel}
                riskRange={riskRange}
              />
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ display: "flex" }}>
            <RiskScale
              adverseEvent={adverseEvent}
              isHighRisk={false}
              riskRange={riskRange}
              borderline={borderline}
              showUncertainty={showUncertainty}
            />
            <RiskLabel
              adverseEvent={adverseEvent}
              isHighRisk={false}
              isModal={false}
              riskLabel={riskLabel}
              riskRange={riskRange}
            />
          </Box>
        )
      ) : (
        <Box sx={{ display: "flex" }}>
          <RiskScale
            adverseEvent={adverseEvent}
            isHighRisk={true}
            riskRange={riskRange}
            borderline={borderline}
            showUncertainty={showUncertainty}
          />
          <RiskLabel
            adverseEvent={adverseEvent}
            isHighRisk={true}
            isModal={false}
            riskLabel={riskLabel}
            riskRange={riskRange}
          />
        </Box>
      )}
    </Box>
  );
}
