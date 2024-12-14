import React from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import StyledIconButton from "./StyledIconButton";

export default function HideUnpinButton({
  showOnlyPinned,
  onToggleShowPinned,
}) {
  return (
    <StyledIconButton
      onClick={onToggleShowPinned}
      isactive={showOnlyPinned.toString()}
      sx={{
        ml: 1,
        backgroundColor: showOnlyPinned
          ? "rgba(25, 118, 210, 0.08)"
          : "transparent",
        "&:hover": {
          backgroundColor: showOnlyPinned
            ? "rgba(25, 118, 210, 0.12)"
            : "rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      <PersonPinIcon
        fontSize="large"
        sx={{
          color: showOnlyPinned ? "primary.main" : "action.active",
        }}
      />
    </StyledIconButton>
  );
}
