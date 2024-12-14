import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";

export default function UncertaintyToggle({
  showUncertainty,
  setShowUncertainty,
}) {
  return (
    <Card sx={{ pl: 2 }}>
      <FormControl>
        <FormLabel>Uncertainty Line</FormLabel>
        <RadioGroup
          row
          aria-labelledby="direction-group"
          name="direction-group"
          value={showUncertainty}
          onChange={(e) => setShowUncertainty(e.target.value)}
        >
          <FormControlLabel
            value="show"
            control={<Radio />}
            label="Show Uncertainty"
          />
          <FormControlLabel
            value="noshow"
            control={<Radio />}
            label="No Uncertainty"
          />
        </RadioGroup>
      </FormControl>
    </Card>
  );
}
