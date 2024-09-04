import React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Typography, IconButton } from "@mui/material";
import PatientRisks from "./PatientRisks";
import { highestRiskColor } from "../Utils/Calculator";
import { filterRelevantAndOtherEvents } from "../Utils/FilterFunctions";
import CircleIcon from "@mui/icons-material/Circle";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Patient({
  patient,
  riskRange,
  selectedAdverseEvents,
  showFilteredOutcomes,
  isFavorite,
  onToggleFavorite,
}) {
  const [color] = highestRiskColor(patient, riskRange);
  const [relevant, others] = filterRelevantAndOtherEvents(
    selectedAdverseEvents,
    patient.adverseEvents,
    riskRange
  );

  const displayPID = patient.PID.replace("# ", "").trim();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={2} sx={{ borderRight: "1.5px solid #000" }}>
        <Box
          sx={{
            m: 2,
            ml: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CircleIcon sx={{ color, marginRight: 1 }} />
            <Link
              to={`/${displayPID}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {displayPID}
              </Typography>
            </Link>
          </Box>
          <IconButton
            onClick={() => onToggleFavorite(patient.PID)}
            color={isFavorite ? "primary" : "default"}
            sx={{ padding: 0 }}
          >
            {isFavorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Box>
      </Grid>

      {showFilteredOutcomes && (
        <Grid
          item
          xs={12}
          md={showFilteredOutcomes ? 10 : 4}
          sx={{
            borderRight: !showFilteredOutcomes ? "1.5px dashed #000" : "none",
          }}
        >
          <Box sx={{ p: 2 }}>
            <PatientRisks adverseEvents={relevant} riskRange={riskRange} />
          </Box>
        </Grid>
      )}
      {!showFilteredOutcomes && (
        <Grid item xs={12} md={showFilteredOutcomes ? 6 : 10}>
          <Box sx={{ p: 2 }}>
            <PatientRisks adverseEvents={others} riskRange={riskRange} />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
