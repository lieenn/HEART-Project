import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function SelectedChips({
  selectedAdverseEvents,
  setSelectedAdverseEvents,
}) {
  console.log(selectedAdverseEvents);
  const handleDelete = (eventToDelete) => () => {
    setSelectedAdverseEvents((events) =>
      events.filter((event) => event !== eventToDelete)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        // border: "1px solid #e0e0e0",
        // borderRadius: 10,
        minHeight: "48px",
      }}
      component="ul"
    >
      {selectedAdverseEvents.length > 0 ? (
        selectedAdverseEvents.map((event, index) => (
          <ListItem key={index}>
            <Chip
              label={event}
              onDelete={handleDelete(event)}
              sx={{ margin: "2px" }} // Add some margin between chips
            />
          </ListItem>
        ))
      ) : (
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.875rem",
            lineHeight: "32px",
            mt: 0.5,
            mr: 1,
          }}
        >
          No Filter Applied
        </Typography>
      )}
    </Box>
  );
}
