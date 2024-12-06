import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";

export default function DirectionToggle({ direction, setDirection }) {
  return (
    <Card sx={{ pl: 2 }}>
      <FormControl>
        <FormLabel>Direction</FormLabel>
        <RadioGroup
          row
          aria-labelledby="direction-group"
          name="direction-group"
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
    </Card>
  );
}
