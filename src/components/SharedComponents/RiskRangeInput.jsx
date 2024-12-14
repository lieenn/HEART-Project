import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function RiskRangeInput({ onChange }) {
  const [minValue, setMinValue] = useState(0.4);
  const [modValue, setModValue] = useState(0.6);
  const [modHighValue, setModHighValue] = useState(0.8);

  const handleUpdate = () => {
    onChange([minValue, modValue, modHighValue, 1]);
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
        label="Minimal -> Moderate"
        type="number"
        value={minValue}
        onChange={(e) => setMinValue(parseFloat(e.target.value))}
      />
      <TextField
        label="Moderate -> Moderate High"
        type="number"
        value={modValue}
        onChange={(e) => setModValue(parseFloat(e.target.value))}
      />
      <TextField
        label="Moderate High -> High"
        type="number"
        value={modHighValue}
        onChange={(e) => setModHighValue(parseFloat(e.target.value))}
      />
      <Button onClick={handleUpdate}>Update</Button>
    </Box>
  );
}

export default RiskRangeInput;
