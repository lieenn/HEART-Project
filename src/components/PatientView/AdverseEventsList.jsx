import React from "react";
import { List, ListItem, Box, Typography } from "@mui/material";
import AdverseEvent from "./AdverseEvent";
import { FilterUnwantedAdverse } from "../Utils/FilterFunctions";

/**
 * Displays a list of adverse events based on the provided
 * risk filter and header information. It can be used to display both
 * high-risk and low-risk adverse events.
 *
 * @param {Array} adverseEvents - The array of adverse events of the patient.
 * @param {Function} riskFilter - The function to filter events by risk level.
 * @param {String} header - The header title indicating the risk level.
 * @param {String} bgColor - The background color for the header.
 * @returns {JSX.Element} - The rendered adverse events list as a list.
 */
export default function AdverseEventsList({
  adverseEvents,
  riskFilter,
  header,
  bgColor,
}) {
  const risks = FilterUnwantedAdverse(adverseEvents);
  const filteredRisks = riskFilter(risks);
  const sortedRisks = filteredRisks.sort((a, b) => b.riskScore - a.riskScore);

  return (
    <Box>
      <Box>
        <Typography
          gutterBottom
          sx={{
            bgcolor: bgColor,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
            color: "white",
            width: "100%",
          }}
        >
          {header}
        </Typography>
        <Typography sx={{ m: 2 }}>
          Patient is predicted{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {header.toLowerCase()}
          </Typography>{" "}
          for these adverse events:
        </Typography>
      </Box>

      {sortedRisks.length > 0 ? (
        <List>
          {sortedRisks.map((risk, index) => (
            <ListItem key={index}>
              <AdverseEvent adverseEvent={risk} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography sx={{ m: 2, fontStyle: "italic" }}>
          No {header.toLowerCase()} found.
        </Typography>
      )}
    </Box>
  );
}
