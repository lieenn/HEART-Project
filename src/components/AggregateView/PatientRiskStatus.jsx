import React from "react";
import { Box, Popover, Typography } from "@mui/material";
import { calculateColor } from "../Utils/Calculator";
import SvgRectangle from "../SharedComponents/SvgRectangle";

export default function PatientRiskStatus({
  risk,
  riskRange,
  view,
  direction,
  borderline,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const titleLength = risk.title.length;
  const width = Math.max(
    100,
    titleLength <= 15 ? titleLength * 12 : titleLength * 10
  );
  const height = 32;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mr: 2,
        position: "relative",
      }}
    >
      <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        <SvgRectangle
          risk={risk}
          riskRange={riskRange}
          width={width}
          height={height}
          text={risk.title}
          textAlign="center"
          view={view}
          direction={direction}
          borderline={borderline}
        />
      </div>
      <Popover
        id="risk-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        sx={{ pointerEvents: "none" }}
      >
        <Typography sx={{ p: 2 }}>
          Risk: {(risk.riskScore * 100).toFixed(2)}%
        </Typography>
      </Popover>
    </Box>
  );
}
