import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";

export default function BorderlineToggle({ borderline, setBorderline, view }) {
  return (
    <Card sx={{ pl: 2 }}>
      <FormControl>
        <FormLabel id="borderline-group">Borderline</FormLabel>
        <RadioGroup
          row
          aria-labelledby="borderline-group"
          name="borderline-toggle-group"
          value={borderline}
          onChange={(e) => setBorderline(e.target.value)}
        >
          <FormControlLabel
            value="borderline1"
            control={<Radio />}
            label="1 Color - Moderate"
          />
          <FormControlLabel
            value="borderline2"
            control={<Radio />}
            label="1 Color - Highest"
          />
          {view !== "view4" && (
            <FormControlLabel
              value="borderline3"
              control={<Radio />}
              label="Multiple Colors"
            />
          )}
        </RadioGroup>
      </FormControl>
    </Card>
  );
}
