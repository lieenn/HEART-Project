import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function RiskRangeInput({ onChange }) {
  const [minValue, setMinValue] = useState(0.4);
  const [modValue, setModValue] = useState(0.6);
  const [modHighValue, setModHighValue] = useState(0.8);
  const [highValue, setHighValue] = useState(1);

  const handleUpdate = () => {
    onChange([minValue, modValue, modHighValue, highValue]);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        label="Minimal"
        type="number"
        value={minValue}
        onChange={(e) => setMinValue(parseFloat(e.target.value))}
      />
      <TextField
        label="Moderate"
        type="number"
        value={modValue}
        onChange={(e) => setModValue(parseFloat(e.target.value))}
      />
      <TextField
        label="Moderate High"
        type="number"
        value={modHighValue}
        onChange={(e) => setModHighValue(parseFloat(e.target.value))}
      />
      <TextField
        label="High"
        type="number"
        value={highValue}
        onChange={(e) => setHighValue(parseFloat(e.target.value))}
      />
      <Button onClick={handleUpdate}>Update</Button>
    </Box>
  );
}

export default RiskRangeInput;