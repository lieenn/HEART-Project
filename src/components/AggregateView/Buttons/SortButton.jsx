import React from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import StyledIconButton from "./StyledIconButton";

export default function SortButton({ value, onSort, isActive }) {
  return (
    <StyledIconButton
      onClick={() => onSort(value)}
      isactive={isActive.toString()}
      sx={{ ml: 1 }}
    >
      <SwapVertIcon fontSize="large" />
    </StyledIconButton>
  );
}
