import React from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { colorScale } from "../Utils/Calculator";

const Legend = ({ riskRange = [0.4, 0.6, 0.8, 1] }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const labels = [
    "Minimal Risk",
    "Moderate Risk",
    "Moderate High Risk",
    "High Risk",
    "Uncertainty",
    "Size",
  ];

  const getRangeDescription = (index) => {
    if (index === labels.length - 2)
      return "Risk prediction based on confidence interval";
    if (index === labels.length - 1)
      return "Range of uncertainty - larger boxes show greater uncertainty";
    if (index === 0) return `0 - ${(riskRange[0] * 100).toFixed(0)}%`;
    if (index === labels.length - 3)
      return `>${(riskRange[index - 1] * 100).toFixed(0)}%`;
    return `${(riskRange[index - 1] * 100).toFixed(0)}% - ${(
      riskRange[index] * 100
    ).toFixed(0)}%`;
  };

  const getLegendBox = (index, label) => {
    const isSpecialBox =
      index === labels.length - 2 || index === labels.length - 1;

    if (index === labels.length - 1) {
      return (
        <Box sx={{ position: "relative", width: 24, height: 24 }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              border: "1.5px solid black",
              borderStyle: "dashed dashed dashed solid",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -20,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "16px" }}>↔</span>
            </Box>
          </Box>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            width: 24,
            height: 24,
            backgroundColor: isSpecialBox ? "#fff" : colorScale(label)[0],
            border: "1.5px solid black",
            borderStyle: isSpecialBox ? "dashed dashed dashed solid" : "solid",
          }}
        />
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "flex-start" : "center",
        gap: 3,
        mr: 2,
      }}
    >
      <Typography variant="h6">Legend</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isSmallScreen
            ? "1fr"
            : isMediumScreen
            ? "repeat(3, auto)"
            : "repeat(6, auto)",
          gap: "24px",
          alignItems: "center",
        }}
      >
        {labels.map((label, index) => (
          <Tooltip
            key={label}
            title={`${label}: ${getRangeDescription(index)}`}
            arrow
            placement="top"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "help",
                whiteSpace: "nowrap",
              }}
            >
              {getLegendBox(index, label)}
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "14px", sm: "16px" }, fontWeight: "500" }}
              >
                {label}
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default Legend;

// Divide legdn into two sections
// import React from "react";
// import {
//   Box,
//   Typography,
//   useTheme,
//   useMediaQuery,
//   Tooltip,
// } from "@mui/material";
// import { colorScale } from "../Utils/Calculator";

// const Legend = ({ riskRange = [0.4, 0.6, 0.8, 1] }) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

//   const labels = [
//     "Minimal Risk",
//     "Moderate Risk",
//     "Moderate High Risk",
//     "High Risk",
//     "Prediction Uncertainty",
//     "Size",
//   ];

//   const getRangeDescription = (index) => {
//     if (index === labels.length - 2)
//       return "Risk prediction based on confidence interval";
//     if (index === labels.length - 1)
//       return "Range of uncertainty - larger boxes show greater uncertainty";
//     if (index === 0) return `0 - ${(riskRange[0] * 100).toFixed(0)}%`;
//     if (index === labels.length - 3)
//       return `>${(riskRange[index - 1] * 100).toFixed(0)}%`;
//     return `${(riskRange[index - 1] * 100).toFixed(0)}% - ${(
//       riskRange[index] * 100
//     ).toFixed(0)}%`;
//   };

//   const getLegendBox = (index, label) => {
//     const isSpecialBox =
//       index === labels.length - 2 || index === labels.length - 1;

//     if (index === labels.length - 1) {
//       return (
//         <Box sx={{ position: "relative", width: 24, height: 24 }}>
//           <Box
//             sx={{
//               width: "100%",
//               height: "100%",
//               backgroundColor: "#fff",
//               border: "1.5px solid black",
//               borderStyle: "dashed dashed dashed solid",
//             }}
//           >
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: -20,
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <span style={{ fontSize: "16px" }}>↔</span>
//             </Box>
//           </Box>
//         </Box>
//       );
//     } else {
//       return (
//         <Box
//           sx={{
//             width: 24,
//             height: 24,
//             backgroundColor: isSpecialBox ? "#fff" : colorScale(label)[0],
//             border: "1.5px solid black",
//             borderStyle: isSpecialBox ? "dashed dashed dashed solid" : "solid",
//           }}
//         />
//       );
//     }
//   };

//   const mainLabels = labels.slice(0, 4);
//   const secondaryLabels = labels.slice(4);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: isSmallScreen ? "column" : "row",
//         alignItems: isSmallScreen ? "flex-start" : "center",
//         gap: 2,
//       }}
//     >
//       <Typography variant="h6" sx={{ mr: 2 }}>
//         Legend
//       </Typography>
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "16px",
//             alignItems: "center",
//           }}
//         >
//           {mainLabels.map((label, index) => (
//             <Tooltip
//               key={label}
//               title={`${label}: ${getRangeDescription(index)}`}
//               arrow
//               placement="top"
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   cursor: "help",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {getLegendBox(index, label)}
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     fontSize: { xs: "14px", sm: "16px" },
//                     fontWeight: "500",
//                   }}
//                 >
//                   {label}
//                 </Typography>
//               </Box>
//             </Tooltip>
//           ))}
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             gap: "16px",
//             alignItems: "center",
//           }}
//         >
//           {secondaryLabels.map((label, index) => (
//             <Tooltip
//               key={label}
//               title={`${label}: ${getRangeDescription(index + 4)}`}
//               arrow
//               placement="top"
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   cursor: "help",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {getLegendBox(index + 4, label)}
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     fontSize: { xs: "14px", sm: "16px" },
//                     fontWeight: "500",
//                   }}
//                 >
//                   {label}
//                 </Typography>
//               </Box>
//             </Tooltip>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Legend;
