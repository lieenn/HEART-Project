import React from "react";
import { Grid, Box, useTheme, useMediaQuery } from "@mui/material";

export default function TableRow({
  leftContent,
  rightContent,
  isHeader = false,
}) {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmScreen = useMediaQuery(theme.breakpoints.only("sm"));

  return (
    <Grid container>
      <Grid item xs={4} sm={4} md={3} lg={2} xl={2}>
        <Box
          sx={{
            pt: { xs: 1, sm: 2 },
            pl: isHeader ? { xs: 1, sm: 2, md: 3 } : { xs: 1, sm: 2 },
            pr: { xs: 1, sm: 2 },
            borderRight: { xs: "1.5px solid #000" },
            overflow: "hidden",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {leftContent}
        </Box>
      </Grid>
      <Grid item xs={8} sm={8} md={9} lg={10} xl={10}>
        <Box
          sx={{
            pt: { xs: 1, sm: 2 },
            pl: { xs: 2, sm: 4 },
            pr: { xs: 1, sm: 2 },
            overflow: "hidden",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            backgroundColor: "#fafafa",
          }}
        >
          {rightContent}
        </Box>
      </Grid>
    </Grid>
  );
}
