import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Divider,
  OutlinedInput,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 480,
    },
  },
};

const SELECT_ALL = "Select All";
const DESELECT_ALL = "Deselect All";

export default function MultiSelect({
  adverseEventsList,
  selectedAdverseEvents,
  setSelectedAdverseEvents,
}) {
  const handleChange = (event) => {
    const value = event.target.value;

    if (value.includes(SELECT_ALL)) {
      setSelectedAdverseEvents(adverseEventsList);
    } else if (value.includes(DESELECT_ALL)) {
      setSelectedAdverseEvents([]);
    } else {
      setSelectedAdverseEvents(value);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="multiple-checkbox-label">Adverse Events</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={selectedAdverseEvents}
          onChange={handleChange}
          input={<OutlinedInput label="Adverse Events" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          <MenuItem
            value={SELECT_ALL}
            sx={{
              display: "inline-flex",
              width: "50%", // Adjust for two items per row
              alignItems: "center",
              padding: "6px 16px",
            }}
          >
            <Checkbox
              checked={
                selectedAdverseEvents.length === adverseEventsList.length
              }
            />
            <ListItemText primary={SELECT_ALL} />
          </MenuItem>
          <MenuItem
            value={DESELECT_ALL}
            sx={{
              display: "inline-flex",
              width: "50%", // Adjust for two items per row
              alignItems: "center",
              padding: "6px 16px",
            }}
          >
            <Checkbox checked={selectedAdverseEvents.length === 0} />
            <ListItemText primary={DESELECT_ALL} />
          </MenuItem>
          <Divider />
          {adverseEventsList.map((name) => (
            <MenuItem
              key={name}
              value={name}
              sx={{
                display: "inline-flex",
                width: "50%", // Adjust for two items per row
                alignItems: "center",
                padding: "6px 16px",
              }}
            >
              <Checkbox checked={selectedAdverseEvents.includes(name)} />
              <ListItemText
                primary={name}
                sx={{
                  "& .MuiTypography-root": {
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  },
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
