import React from "react";
import { Grid, IconButton, Typography, Box } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SwapVertIcon from "@mui/icons-material/SwapVert";

/**
 * A component that renders sorting buttons for the grid-based patient view.
 *
 * @param {Function} setSortingOption - Function to update the sorting option.
 *
 * @returns {JSX.Element} The rendered sort buttons component.
 */
export default function SortButtons({
  setSortingOption,
  showFilteredOutcomes,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2} sx={{}}>
        <Box sx={{ mt: 2, pt: 2, borderRight: " 1.5px solid #000" }}>
          <Box sx={{ display: "flex", ml: 2 }}>
            <IconButton
              onClick={() => setSortingOption("Overall highest")}
              sx={{ borderRadius: 0, padding: "4px 6px", m: 1 }}
            >
              <SwapVertIcon />
              <SortIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mt: 0.5, m: 1 }}>
              Patient
            </Typography>
          </Box>
        </Box>
      </Grid>

      {showFilteredOutcomes && (
        <Grid item xs={12} md={4}>
          <Box sx={{ mt: 2, pt: 2, borderRight: " 1.5px dashed #000" }}>
            <Box sx={{ display: "flex" }}>
              <IconButton
                onClick={() => setSortingOption("Filtered conditions")}
                sx={{ borderRadius: 0, padding: "4px 6px", m: 1 }}
              >
                <SwapVertIcon />
                <SortIcon />
              </IconButton>
              <Typography variant="h6" sx={{ mt: 0.5, mt: 1 }}>
                Filtered Outcomes
              </Typography>
            </Box>
          </Box>
        </Grid>
      )}

      <Grid item xs={12} md={showFilteredOutcomes ? 6 : 10}>
        <Box sx={{ mt: 4.5, ml: 1 }}>
          <Typography variant="h6" sx={{ mt: 0.5, m: 1 }}>
            Other Outcomes
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
