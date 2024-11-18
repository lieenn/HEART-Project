import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";

export default function PatientInfo({
  displayPID,
  color,
  isFavorite,
  onToggleFavorite,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md", "lg"));

  return (
    <Box
      sx={{
        m: { xs: 1, sm: 1.5, md: 2 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        m: 0.8,
      }}
    >
      <Box
        sx={{
          display: "flex",
          pl: 1,
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
            border: "1.5px solid",
            // boxShadow:
            //   "0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2)",
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
          }}
        >
          <Typography
            variant={isMobile ? "h6" : isTablet ? "h5" : "h4"}
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "1.2rem",
                sm: "1.25rem",
                md: "1.30rem",
                lg: "1.35rem",
              },
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
        // disableRipple
        sx={{
          padding: 0,
          marginLeft: 1,
          flexShrink: 0,
          width: { xs: 24, sm: 28, md: 32 },
          height: { xs: 24, sm: 28, md: 32 },
        }}
      >
        {isFavorite ? (
          <PushPinIcon fontSize={isMobile ? "small" : "medium"} />
        ) : (
          <PushPinIcon fontSize={isMobile ? "small" : "medium"} />
        )}
      </IconButton>
    </Box>
  );
}
