import React from "react";
import { IconButton } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export default function SortButton({ value, onSort }) {
  return (
    <IconButton
      onClick={() => onSort(value)}
      sx={{
        borderRadius: "50%",
        padding: "6px",
        minWidth: "auto",
        width: "24px",
        height: "24px",
        border: "none",
        outline: "none",
        color: "action.active",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "transparent",
        },
        "&:focus": {
          outline: "none",
        },
      }}
    >
      <SwapVertIcon />
    </IconButton>
  );
}
