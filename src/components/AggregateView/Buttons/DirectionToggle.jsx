import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

export default function DirectionToggle({ direction, setDirection }) {
  return (
    <Box sx={{ mb: 2 }}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="view-toggle-group-label"
          name="view-toggle-group"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        >
          <FormControlLabel
            value="horizontal"
            control={<Radio />}
            label="Horizontal"
          />
          <FormControlLabel
            value="vertical"
            control={<Radio />}
            label="Vertical"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
