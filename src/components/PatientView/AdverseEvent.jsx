import React from "react";
import { calculateColor, calculateRisk } from "../Utils/Calculator";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, IconButton, Avatar, Typography, Grid } from "@mui/material";
import RiskScale from "./RiskScale";
import SvgRectangle from "../SharedComponents/SvgRectangle";
import ExplanationButton from "./Explanation/ExplanationButton";
import RiskLabel from "./RiskLabel";

export default function AdverseEvent({
  adverseEvent,
  riskRange,
  borderline,
  riskLabel,
}) {
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
        <>
          <Grid item xs={5}>
            <RiskScale
              adverseEvent={adverseEvent}
              isHighRisk={false}
              riskRange={riskRange}
              borderline={borderline}
            />
          </Grid>
          <RiskLabel
            adverseEvent={adverseEvent}
            isHighRisk={false}
            riskLabel={riskLabel}
            riskRange={riskRange}
          />
        </>
      ) : (
        <>
          <RiskScale
            adverseEvent={adverseEvent}
            isHighRisk={true}
            riskRange={riskRange}
            borderline={borderline}
          />
          <RiskLabel
            adverseEvent={adverseEvent}
            isHighRisk={true}
            riskLabel={riskLabel}
            riskRange={riskRange}
          />
        </>
      )}
    </Box>
  );
}
// import React from "react";
// import { calculateRisk } from "../Utils/Calculator";
// import { Box, Grid, Typography } from "@mui/material";
// import RiskScale from "./RiskScale";
// import SvgRectangle from "../SharedComponents/SvgRectangle";
// import ExplanationButton from "./Explanation/ExplanationButton";

// export default function AdverseEvent({ adverseEvent, riskRange, borderline }) {
//   const rectWidth = 216;
//   const rectHeight = 36;
//   const riskLevel = calculateRisk(adverseEvent.riskScore, riskRange);

//   return (
//     <Grid container spacing={2}>
//       {riskLevel === "Minimal" ? (
//         <Grid item xs={12} sm={6}>
//           <Box sx={{ display: "flex", flexDirection: "column" }}>
//             <SvgRectangle
//               risk={adverseEvent}
//               riskRange={riskRange}
//               width={rectWidth}
//               height={rectHeight}
//               text={adverseEvent.title}
//               isPatientSpecific={true}
//             >
//               <ExplanationButton risk={adverseEvent} riskRange={riskRange} />
//             </SvgRectangle>
//             {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: -3 }}> */}
//             <Grid item container alignItems="center" wrap="nowrap" spacing={2}>
//               <Grid item xs={8} sx={{ ml: -3 }}>
//                 <RiskScale
//                   adverseEvent={adverseEvent}
//                   isHighRisk={false}
//                   riskRange={riskRange}
//                   borderline={borderline}
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <Typography
//                   fontWeight="bold"
//                   color="black"
//                   sx={{ whiteSpace: "nowrap" }}
//                 >
//                   Risk: {Math.round(adverseEvent.riskScore * 100)}%
//                 </Typography>
//               </Grid>
//             </Grid>
//             {/* </Box> */}
//           </Box>
//         </Grid>
//       ) : (
//         <>
//           <Grid item xs={12} md={3}>
//             <SvgRectangle
//               risk={adverseEvent}
//               riskRange={riskRange}
//               width={rectWidth}
//               height={rectHeight}
//               text={adverseEvent.title}
//               isPatientSpecific={true}
//             >
//               <ExplanationButton risk={adverseEvent} riskRange={riskRange} />
//             </SvgRectangle>
//           </Grid>
//           <Grid item container xs={12} md={9} alignItems="center" wrap="nowrap">
//             <Grid item>
//               <RiskScale
//                 adverseEvent={adverseEvent}
//                 isHighRisk={true}
//                 riskRange={riskRange}
//                 borderline={borderline}
//               />
//             </Grid>
//             <Grid item>
//               <Typography fontWeight="bold" color="black">
//                 Risk: {Math.round(adverseEvent.riskScore * 100)}%
//               </Typography>
//             </Grid>
//           </Grid>
//         </>
//       )}
//     </Grid>
//   );
// }
