import React, { useState } from "react";
import { Button, Collapse, Box, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TuneIcon from "@mui/icons-material/Tune";

const Controls = ({ children, isControlOpen, setIsControlOpen }) => {
  return (
    <>
      <Button
        onClick={() => setIsControlOpen(!isControlOpen)}
        variant="outlined"
        fullWidth
        sx={{
          justifyContent: "space-between",
          mb: 1,
        }}
        endIcon={isControlOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        <TuneIcon />
      </Button>

      <Collapse in={isControlOpen}>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {children}
        </Box>
      </Collapse>
    </>
  );
};

export default Controls;
