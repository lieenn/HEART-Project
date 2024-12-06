import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";

export default function ViewToggle({ view, setView }) {
  return (
    <Card sx={{ pl: 2 }}>
      <FormControl>
        <FormLabel>Uncertainty View</FormLabel>
        <RadioGroup
          row
          aria-labelledby="view-toggle-group-label"
          name="view-toggle-group"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <FormControlLabel value="view1" control={<Radio />} label="Dotted" />
          <FormControlLabel
            value="view2"
            control={<Radio />}
            label="Gradient"
          />
          <FormControlLabel
            value="view3"
            control={<Radio />}
            label="Open Gradient"
          />
          <FormControlLabel value="view4" control={<Radio />} label="Precise" />
        </RadioGroup>
      </FormControl>
    </Card>
  );
}
