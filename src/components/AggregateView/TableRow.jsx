import React from "react";
import { Grid, Box } from "@mui/material";

export default function TableRow({ leftContent, rightContent }) {
  const commonBoxStyles = {
    display: "flex",
    alignItems: "center",
    minHeight: 28,
    pl: 1,
  };

  return (
    <Grid container alignItems="stretch">
      <Grid item xs={4} sm={3} md={1.5}>
        <Box
          sx={{
            ...commonBoxStyles,
            borderRight: "1.5px solid #000",
            height: "100%",
          }}
        >
          {leftContent}
        </Box>
      </Grid>
      <Grid item xs={8} sm={9} md={10}>
        <Box
          sx={{
            ...commonBoxStyles,
            flexWrap: "wrap",
            // backgroundColor: "#fafafa",
            height: "100%",
          }}
        >
          {rightContent}
        </Box>
      </Grid>
    </Grid>
  );
}
