import { List, ListItem, Box, Typography } from "@mui/material";
import {
  FilterHighRisk,
  FilterUnwantedAdverse,
} from "../Utils/FilterFunctions";
import AdverseEvent from "./AdverseEvent";

/**
 * A list of low risk adverse events.
 *
 * This component filters the patient's adverse events to display only
 * those with low risk. If no low-risk events are found,
 * it displays a message indicating this.
 *
 * @param {Array} param0 - The array of adverse events of the patient.
 * @returns {JSX.Element} - The rendered low-risk adverse events as a list.
 */
export default function AdverseEventsLow({ adverseEvents }) {
  const risks = FilterUnwantedAdverse(adverseEvents);
  const filteredRisks = FilterHighRisk(risks);
  const sortedRisks = filteredRisks.sort((a, b) => b.riskScore - a.riskScore);

  return (
    <Box>
      <Box>
        <Typography
          gutterBottom
          sx={{
            bgcolor: "#82c3f6",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
            color: "white",
            width: "100%",
          }}
        >
          Low Risk Adverse Events
        </Typography>
        <Typography sx={{ m: 2 }}>
          Patient is predicted{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            low risk
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
          No low-risk adverse events found.
        </Typography>
      )}
    </Box>
  );
}
