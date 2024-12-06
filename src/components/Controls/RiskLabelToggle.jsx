import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";

export default function RiskLabelToggle({ riskLabel, setRiskLabel }) {
  return (
    <Card sx={{ pl: 2 }}>
      <FormControl>
        <FormLabel id="risk-label-group">Risk Label</FormLabel>
        <RadioGroup
          row
          aria-labelledby="risk-label-group"
          name="risk-label-group"
          value={riskLabel}
          onChange={(e) => setRiskLabel(e.target.value)}
        >
          <FormControlLabel
            value="label1"
            control={<Radio />}
            label="Predicted Risk"
          />
          <FormControlLabel
            value="label2"
            control={<Radio />}
            label="Absolute Risk"
          />
        </RadioGroup>
      </FormControl>
    </Card>
  );
}
