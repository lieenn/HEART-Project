import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Box,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  Typography,
  TextField,
  InputAdornment,
  styled,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";

const SELECT_ALL = "Select All";
const DESELECT_ALL = "Deselect All";

// Styled IconButton to be small and round like the ToggleButton
const StyledIconButton = styled(IconButton)(({ theme, isactive }) => ({
  backgroundColor: isactive === "true" ? theme.palette.primary.main : "inherit",
  color: isactive === "true" ? theme.palette.primary.contrastText : "grey",
  "&:hover": {
    backgroundColor:
      isactive === "true"
        ? theme.palette.primary.dark
        : theme.palette.action.hover,
  },
  borderRadius: "50%",
  padding: "6px",
  width: "32px",
  height: "32px",
}));

export default function FilterButton({
  adverseEventsList,
  selectedAdverseEvents,
  setSelectedAdverseEvents,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("adverseEventsList:", adverseEventsList);
    console.log("selectedAdverseEvents:", selectedAdverseEvents);
  }, [adverseEventsList, selectedAdverseEvents]);

  const stableAdverseEvents = useMemo(() => {
    if (!Array.isArray(adverseEventsList)) {
      console.error("adverseEventsList is not an array:", adverseEventsList);
      setError("Invalid adverse events list");
      return [];
    }
    return adverseEventsList.map((event, index) => ({
      id: index,
      name: event,
    }));
  }, [adverseEventsList]);

  const filteredEvents = useMemo(() => {
    return stableAdverseEvents.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [stableAdverseEvents, searchTerm]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm("");
  };

  const handleChange = useCallback(
    (value) => {
      if (!setSelectedAdverseEvents) {
        console.error("setSelectedAdverseEvents is not a function");
        return;
      }
      if (value === SELECT_ALL) {
        setSelectedAdverseEvents(adverseEventsList || []);
      } else if (value === DESELECT_ALL) {
        setSelectedAdverseEvents([]);
      } else {
        setSelectedAdverseEvents((prev) => {
          if (!Array.isArray(prev)) {
            console.error("Previous state is not an array:", prev);
            return [value];
          }
          const newSelected = new Set(prev);
          if (newSelected.has(value)) {
            newSelected.delete(value);
          } else {
            newSelected.add(value);
          }
          return Array.from(newSelected);
        });
      }
    },
    [adverseEventsList, setSelectedAdverseEvents]
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const isFilterActive =
    selectedAdverseEvents && selectedAdverseEvents.length > 0;

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <StyledIconButton
        onClick={handleClick}
        aria-describedby={id}
        isactive={isFilterActive.toString()}
      >
        <FilterAltIcon fontSize="small" />
      </StyledIconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <List sx={{ width: 1000, bgcolor: "background.paper" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <ListItem
              onClick={() => handleChange(SELECT_ALL)}
              sx={{ width: "20%" }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={
                    selectedAdverseEvents?.length === adverseEventsList?.length
                  }
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={SELECT_ALL} />
            </ListItem>
            <ListItem
              onClick={() => handleChange(DESELECT_ALL)}
              sx={{ width: "20%" }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedAdverseEvents?.length === 0}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={DESELECT_ALL} />
            </ListItem>
            <TextField
              placeholder="Find..."
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ marginRight: "8px" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ ml: 2 }}
            />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              maxHeight: 400,
              overflowY: "auto",
            }}
          >
            {filteredEvents.map(({ id, name }) => (
              <ListItem
                key={id}
                onClick={() => handleChange(name)}
                sx={{ width: "20%" }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedAdverseEvents?.includes(name)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={name}
                  sx={{
                    "& .MuiTypography-root": {
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    },
                  }}
                />
              </ListItem>
            ))}
          </Box>
        </List>
      </Popover>
    </Box>
  );
}
