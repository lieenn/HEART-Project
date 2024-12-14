import React, { useState } from "react";
import { Button, Collapse, Box, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TuneIcon from "@mui/icons-material/Tune";

const Controls = ({ children }) => {
  const [isControlOpen, setIsControlOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsControlOpen(!isControlOpen)}
        variant="outlined"
        fullWidth
        sx={{
          justifyContent: "space-between",
          mb: 1,
          position: "relative",
          zIndex: 1100,
        }}
        endIcon={isControlOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        <TuneIcon />
      </Button>

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transform: isControlOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out",
          backgroundColor: "white",
          boxShadow: isControlOpen ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <Box
          sx={{
            p: 2,
            maxHeight: "80vh",
            overflowY: "auto",
            borderBottom: "1px solid rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {children}
        </Box>
      </Box>

      {isControlOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          onClick={() => setIsControlOpen(false)}
        />
      )}
    </>
  );
};

export default Controls;
