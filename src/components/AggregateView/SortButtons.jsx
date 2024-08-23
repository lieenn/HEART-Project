import { Box, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function SortButtons({ setSortingOption }) {
  return (
    <Box>
      <IconButton
        sx={{ mr: 16 }}
        onClick={() => setSortingOption("Overall highest")}
      >
        <SortIcon />
      </IconButton>
      <IconButton onClick={() => setSortingOption("Filtered conditions")}>
        <FilterListIcon />
      </IconButton>
    </Box>
  );
}
