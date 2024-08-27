import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Special values for "Select All" and "Deselect All"
const SELECT_ALL = "Select All";
const DESELECT_ALL = "Deselect All";

export default function MultiSelect({
  adverseEventsList,
  selectedAdverseEvents,
  setSelectedAdverseEvents,
}) {
  const handleSelected = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes(SELECT_ALL)) {
      setSelectedAdverseEvents(adverseEventsList);
    } else if (value.includes(DESELECT_ALL)) {
      setSelectedAdverseEvents([]);
    } else {
      setSelectedAdverseEvents(
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  return (
    <Box>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">
          Adverse Events
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedAdverseEvents}
          onChange={handleSelected}
          input={<OutlinedInput label="Adverse Events" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          <MenuItem value={SELECT_ALL}>
            <Checkbox
              checked={
                selectedAdverseEvents.length === adverseEventsList.length
              }
            />
            <ListItemText primary={SELECT_ALL} />
          </MenuItem>
          <MenuItem value={DESELECT_ALL}>
            <Checkbox checked={selectedAdverseEvents.length === 0} />
            <ListItemText primary={DESELECT_ALL} />
          </MenuItem>
          {adverseEventsList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedAdverseEvents.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
