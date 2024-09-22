// import React from "react";
// import { Box, Typography } from "@mui/material";

// const PredictionBox = ({ adverseEvent }) => {
//   const topContributions = adverseEvent.contributions
//     .filter((contribution) => contribution.value !== 0)
//     .sort((a, b) => b.weight - a.weight)
//     .slice(0, 5);

//   const boxColors = ["#666FC0", "#A0A5D9", "#D8DBF0"];
//   const percentageRanges = ["60% - 100%", "35% - 60%", "< 35%"];

//   const ContributionBox = ({ contribution, color }) => {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mt: 1,
//           mb: 1,
//         }}
//       >
//         <Typography color={color} sx={{ fontWeight: "bold", flex: 1 }}>
//           {contribution.title}
//         </Typography>
//         {contribution.value !== 1 && (
//           <Typography color={color} sx={{ ml: 2, fontWeight: "bold" }}>
//             {contribution.value}
//           </Typography>
//         )}
//         {/* Corrected weight percentage */}
//         <Typography color={color} sx={{ ml: 2 }}>
//           {(contribution.weight * 100).toFixed(2)}%
//         </Typography>
//       </Box>
//     );
//   };

//   return (
//     <Box className="w-full max-w-md mx-auto mt-4">
//       <Typography variant="h6" sx={{ mt: 2, mb: 1, textAlign: "center" }}>
//         What contributed to this prediction?
//       </Typography>
//       {[0, 1, 2].map((index) => (
//         <Box key={index} sx={{ display: "flex", alignItems: "stretch", mb: 2 }}>
//           <Box
//             sx={{
//               width: "100%x",
//               writingMode: "vertical-rl",
//               transform: "rotate(180deg)",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               sx={{ fontSize: "0.8rem", color: "black", fontWeight: "bold" }}
//             >
//               {percentageRanges[index]}
//             </Typography>
//           </Box>
//           <Box
//             bgcolor={boxColors[index]}
//             p={1}
//             sx={{ borderRadius: "10px", flex: 1 }}
//           >
//             <ContributionBox
//               contribution={topContributions[index * 2]}
//               color={index === 2 ? "black" : "white"}
//             />
//             {topContributions[index * 2 + 1] && (
//               <ContributionBox
//                 contribution={topContributions[index * 2 + 1]}
//                 color={index === 2 ? "black" : "white"}
//               />
//             )}
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default PredictionBox;

//

import React from "react";
import { Box, Typography } from "@mui/material";

const PredictionBox = ({ adverseEvent }) => {
  const topContributions = adverseEvent.contributions
    .filter((contribution) => contribution.value !== 0)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5);

  const weightRanges = [
    { min: 0.6, max: 1, label: "60% - 100%" },
    { min: 0.35, max: 0.6, label: "35% - 60%" },
    { min: 0, max: 0.35, label: "< 35%" },
  ];

  const boxColors = ["#666FC0", "#A0A5D9", "#D8DBF0"];

  const groupedContributions = weightRanges.map((range) =>
    topContributions.filter(
      (contribution) =>
        contribution.weight >= range.min && contribution.weight < range.max
    )
  );

  const ContributionBox = ({ contribution, color }) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
          mb: 1,
        }}
      >
        <Typography color={color} sx={{ fontWeight: "bold", flex: 1 }}>
          {contribution.title}
        </Typography>
        {contribution.value !== 1 && (
          <Typography color={color} sx={{ ml: 2, fontWeight: "bold" }}>
            {contribution.value}
          </Typography>
        )}
        <Typography color={color} sx={{ ml: 2 }}>
          {(contribution.weight * 100).toFixed(2)}%
        </Typography>
      </Box>
    );
  };

  return (
    <Box className="w-full max-w-md mx-auto mt-4">
      <Typography variant="h6" sx={{ mt: 2, mb: 1, textAlign: "center" }}>
        What contributed to this prediction?
      </Typography>
      {[0, 1, 2].map((index) =>
        groupedContributions[index].length > 0 ? (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "stretch", mb: 2 }}
          >
            <Box
              sx={{
                width: "100%x",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "0.8rem", color: "black", fontWeight: "bold" }}
              >
                {weightRanges[index].label}
              </Typography>
            </Box>
            <Box
              bgcolor={boxColors[index]}
              sx={{ borderRadius: "10px", flex: 1, p: 1, ml: 1 }}
            >
              {groupedContributions[index].map((contribution, i) => (
                <ContributionBox
                  key={i}
                  contribution={contribution}
                  color={index === 2 ? "black" : "white"}
                />
              ))}
            </Box>
          </Box>
        ) : null
      )}
    </Box>
  );
};

export default PredictionBox;
