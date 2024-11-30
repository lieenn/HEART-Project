import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

export default function RiskLabelToggle({ riskLabel, setRiskLabel }) {
  return (
    <Box sx={{ mb: 2 }}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="view-toggle-group-label"
          name="view-toggle-group"
          value={riskLabel}
          onChange={(e) => setRiskLabel(e.target.value)}
        >
          <FormControlLabel
            value="label1"
            control={<Radio />}
            label="Risk Label 1"
          />
          <FormControlLabel
            value="label2"
            control={<Radio />}
            label="Risk Label 2"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
