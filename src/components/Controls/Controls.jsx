import React, { useState } from "react";
import { Button, Collapse, Box, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TuneIcon from "@mui/icons-material/Tune";

const Controls = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ mb: 2 }}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outlined"
        fullWidth
        sx={{
          justifyContent: "space-between",
          mb: 1,
        }}
        endIcon={isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        <TuneIcon />
      </Button>

      <Collapse in={isOpen}>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Collapse>
    </Box>
  );
};

export default Controls;
