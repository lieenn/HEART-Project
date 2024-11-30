import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

export default function RiskLabelToggle({ los, setLos }) {
  return (
    <Box sx={{ mb: 2 }}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="view-toggle-group-label"
          name="view-toggle-group"
          value={los}
          onChange={(e) => setLos(e.target.value)}
        >
          <FormControlLabel value="los1" control={<Radio />} label="LoS 1" />
          <FormControlLabel value="los2" control={<Radio />} label="LoS 2" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
