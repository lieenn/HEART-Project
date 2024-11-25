import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

export default function ViewToggle({ view, setView }) {
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
          <FormControlLabel value="view1" control={<Radio />} label="View 1" />
          <FormControlLabel value="view2" control={<Radio />} label="View 2" />
          <FormControlLabel value="view3" control={<Radio />} label="View 3" />
          <FormControlLabel value="view4" control={<Radio />} label="View 4" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
