import { List, ListItem, Box, Container, Typography } from "@mui/material";
import { FilterLowRisk, FilterUnwantedAdverse } from "../Utils/FilterFunctions";
import AdverseEvent from "./AdverseEvent";

/**
 * A list of high risk adverse events.
 *
 * Filters the patient's adverse events to display only
 * those with high risk. If no high-risk events are found,
 * it displays a message indicating this.
 *
 * @param {Array} param0 - The array of adverse events of the patient.
 * @returns {JSX.Element} - The rendered high-risk adverse events as a list.
 */
export default function AdverseEventsHigh({ adverseEvents }) {
  const risks = FilterUnwantedAdverse(adverseEvents);
  const filteredRisks = FilterLowRisk(risks);
  const sortedRisks = filteredRisks.sort((a, b) => b.riskScore - a.riskScore);

  return (
    <Box>
      {/* Header */}
      <Box>
        <Typography
          gutterBottom
          sx={{
            bgcolor: "#f7917d",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
            color: "white",
            width: "100%",
          }}
        >
          High Risk Adverse Events
        </Typography>
        <Typography sx={{ m: 2 }}>
          Patient is predicted{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            high risk
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
          No high-risk adverse events found.
        </Typography>
      )}
    </Box>
  );
}
