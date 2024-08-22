import { Box, Button } from "@mui/material";
import MultiSelect from "./MultiSelect";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function FilterSortFunctions({
  adverseEventsList,
  selectedAdverseEvents,
  setSelectedAdverseEvents,
  sortingOption,
  setSortingOption,
}) {
  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Sort/Filter Options
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={sortingOption}
        onChange={handleSortingChange}
      >
        <FormControlLabel value="Sort" control={<Radio />} label="Sort" />
        <FormControlLabel
          value="Sort + Filter"
          control={<Radio />}
          label="Sort + Filter"
        />
        <FormControlLabel
          value="Sort by highest"
          control={<Radio />}
          label="Sort by highest"
        />
        <MultiSelect
          adverseEventsList={adverseEventsList}
          selectedAdverseEvents={selectedAdverseEvents}
          setSelectedAdverseEvents={setSelectedAdverseEvents}
        />
      </RadioGroup>
    </FormControl>
  );
}
