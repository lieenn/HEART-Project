import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import StyledIconButton from "./StyledIconButton";

const SELECT_ALL = "Select All";
const DESELECT_ALL = "Deselect All";

export default function FilterButton({
  adverseEventsList,
  selectedAdverseEvents,
  setSelectedAdverseEvents,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <>
      <StyledIconButton
        onClick={handleClick}
        aria-describedby={id}
        isactive={isFilterActive.toString()}
      >
        <FilterAltIcon fontSize="medium" />
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
        <List
          sx={{
            width: isMobile ? "100vw" : "min(1000px, 90vw)",
            maxWidth: "100%",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              flexWrap: "wrap",
              alignItems: "center",
              padding: theme.spacing(1),
            }}
          >
            <TextField
              placeholder="Find..."
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: isMobile ? "100%" : "39%",
                ml: 1,
              }}
            />
            <ListItem
              onClick={() => handleChange(SELECT_ALL)}
              sx={{ width: isMobile ? "100%" : "auto", minWidth: "150px" }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={
                    selectedAdverseEvents?.length === adverseEventsList?.length
                  }
                  tabIndex={-1}
                />
              </ListItemIcon>
              <ListItemText primary={SELECT_ALL} />
            </ListItem>
            <ListItem
              onClick={() => handleChange(DESELECT_ALL)}
              sx={{ width: isMobile ? "100%" : "auto", minWidth: "150px" }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedAdverseEvents?.length === 0}
                  tabIndex={-1}
                />
              </ListItemIcon>
              <ListItemText primary={DESELECT_ALL} />
            </ListItem>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              maxHeight: isMobile ? "calc(100vh - 200px)" : 400,
              overflowY: "auto",
            }}
          >
            {filteredEvents.map(({ id, name }) => (
              <ListItem
                key={id}
                onClick={() => handleChange(name)}
                sx={{
                  width: isMobile ? "100%" : "20%",
                  minWidth: isMobile ? "auto" : "200px",
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedAdverseEvents?.includes(name)}
                    tabIndex={-1}
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
    </>
  );
}
