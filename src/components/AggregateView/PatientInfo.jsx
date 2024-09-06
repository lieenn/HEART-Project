import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function PatientInfo({
  displayPID,
  color,
  isFavorite,
  onToggleFavorite,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      sx={{
        m: { xs: 1, sm: 1.5, md: 2 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Box
          component="span"
          sx={{
            display: "inline-block",
            width: { xs: 16, sm: 18, md: 20 },
            height: { xs: 16, sm: 18, md: 20 },
            borderRadius: "50%",
            backgroundColor: color,
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2)",
            marginRight: { xs: 0.5, sm: 0.75, md: 1 },
            flexShrink: 0,
          }}
        />
        <Link
          to={`/${displayPID}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            variant={isMobile ? "h6" : isTablet ? "h5" : "h4"}
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.25rem", sm: "1.25rem", md: "1.5rem" },
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {displayPID}
          </Typography>
        </Link>
      </Box>
      <IconButton
        onClick={onToggleFavorite}
        color={isFavorite ? "primary" : "default"}
        sx={{
          padding: 0,
          marginLeft: 1,
          flexShrink: 0,
          width: { xs: 24, sm: 28, md: 32 },
          height: { xs: 24, sm: 28, md: 32 },
        }}
      >
        {isFavorite ? (
          <StarIcon fontSize={isMobile ? "small" : "medium"} />
        ) : (
          <StarBorderIcon fontSize={isMobile ? "small" : "medium"} />
        )}
      </IconButton>
    </Box>
  );
}