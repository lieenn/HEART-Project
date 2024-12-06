import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";

export default function RiskLabelToggle({ los, setLos }) {
  return (
    <Card sx={{ pl: 2 }}>
      <FormControl>
        <FormLabel id="los-group">Length of Stay</FormLabel>
        <RadioGroup
          row
          aria-labelledby="los-group"
          name="los-group"
          value={los}
          onChange={(e) => setLos(e.target.value)}
        >
          <FormControlLabel value="los1" control={<Radio />} label="Timeline" />
          <FormControlLabel
            value="los2"
            control={<Radio />}
            label="Distribution"
          />
          <FormControlLabel
            value="los3"
            control={<Radio />}
            label="Range Distribution"
          />
        </RadioGroup>
      </FormControl>
    </Card>
  );
}
