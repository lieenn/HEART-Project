import React from "react";
import { Box, Popover, Typography } from "@mui/material";
import { calculateColor } from "../Utils/Calculator";
import SvgRectangle from "../SvgRectangle";

export default function PatientRiskStatus({ risk, riskRange }) {
  const [textColor, color] = calculateColor(risk.riskScore, riskRange);
  const titleLength = risk.title.length;
  const rectWidth = Math.max(80, titleLength * 10);
  const rectHeight = 32;
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        gap: 1,
        mr: 2,
        position: "relative",
      }}
    >
      <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        <SvgRectangle
          width={rectWidth}
          height={rectHeight}
          fill={color}
          textColor={textColor}
          text={risk.title}
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
