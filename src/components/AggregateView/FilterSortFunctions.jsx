import { Box, Button } from "@mui/material";
import MultiSelect from "./MultiSelect";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

/**
 * A component that renders filtering and sorting options for adverse events.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array<string>} props.adverseEventsList - List of adverse events to filter and sort by.
 * @param {Array<string>} props.selectedAdverseEvents - Currently selected adverse events.
 * @param {Function} props.setSelectedAdverseEvents - Function to update selected adverse events.
 * @param {string} props.sortingOption - Currently selected sorting option.
 * @param {Function} props.setSortingOption - Function to update the sorting option.
 *
 * @returns {JSX.Element} The rendered filter and sort options component.
 */
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
