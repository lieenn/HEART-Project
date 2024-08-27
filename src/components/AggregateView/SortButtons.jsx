import { Box, IconButton, Table, TableCell, TableRow } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export default function SortButtons({ setSortingOption }) {
  return (
    <TableRow sx={{ p: 0, m: 0 }}>
      <TableCell sx={{ borderBottom: "none" }}>
        <IconButton
          onClick={() => setSortingOption("Overall highest")}
          sx={{
            borderRadius: 0,
            padding: "4px 6px",
          }}
        >
          <SwapVertIcon />
          <SortIcon />
        </IconButton>
      </TableCell>
      <TableCell
        sx={{
          border: "none",
          borderLeft: "1.5px solid #000",
          borderRight: "1.5px dashed #000",
        }}
      >
        <IconButton
          onClick={() => setSortingOption("Filtered conditions")}
          sx={{
            borderRadius: 0,
            padding: "4px 6px",
          }}
        >
          <SwapVertIcon />
          <SortIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
