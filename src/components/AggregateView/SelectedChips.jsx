import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

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
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
        borderRadius: 10,
      }}
      component="ul"
    >
      {selectedAdverseEvents.map((event, index) => {
        return (
          <ListItem key={index}>
            <Chip label={event} onDelete={handleDelete(event)} />
          </ListItem>
        );
      })}
    </Paper>
  );
}
