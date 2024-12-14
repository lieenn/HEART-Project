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

  const RiskComponents = ({ isHighRisk, wrapper }) => {
    const components = (
      <>
        <RiskScale
          adverseEvent={adverseEvent}
          isHighRisk={isHighRisk}
          riskRange={riskRange}
          borderline={borderline}
          showUncertainty={showUncertainty}
        />
        <RiskLabel
          adverseEvent={adverseEvent}
          isHighRisk={isHighRisk}
          isModal={false}
          riskLabel={riskLabel}
          riskRange={riskRange}
        />
      </>
    );

    if (wrapper) {
      return wrapper(components);
    }
    return components;
  };

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
          <RiskComponents
            isHighRisk={false}
            wrapper={(children) => (
              <Grid item xs={6}>
                {children}
              </Grid>
            )}
          />
        ) : (
          <RiskComponents
            isHighRisk={false}
            wrapper={(children) => (
              <Box sx={{ display: "flex" }}>{children}</Box>
            )}
          />
        )
      ) : (
        <RiskComponents isHighRisk={true} />
      )}
    </Box>
  );
}
