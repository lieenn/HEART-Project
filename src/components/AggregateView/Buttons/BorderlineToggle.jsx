import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

export default function BorderlineToggle({ view, setView }) {
  return (
    <Box sx={{ mb: 2 }}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="view-toggle-group-label"
          name="view-toggle-group"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <FormControlLabel
            value="borderline1"
            control={<Radio />}
            label="Borderline 1"
          />
          <FormControlLabel
            value="borderline2"
            control={<Radio />}
            label="Borderline 2"
          />
          <FormControlLabel
            value="borderline3"
            control={<Radio />}
            label="Borderline 3"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
