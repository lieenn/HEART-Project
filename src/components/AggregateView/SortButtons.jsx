import {
  Box,
  IconButton,
  Tab,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export default function SortButtons({ setSortingOption }) {
  return (
    <TableRow sx={{ p: 0, m: 0 }}>
      <TableCell sx={{ borderBottom: "none" }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ mt: 0.5 }}>
            Patient
          </Typography>
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
        </Box>
      </TableCell>
      <TableCell
        sx={{
          border: "none",
          borderLeft: "1.5px solid #000",
          borderRight: "1.5px dashed #000",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ mt: 0.5 }}>
            Filtered Outcomes
          </Typography>

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
        </Box>
      </TableCell>
      <TableCell sx={{ borderBottom: "none" }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ mt: 0.5 }}>
            Other Outcomes
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}
