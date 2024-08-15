import { List, ListItem, Box, Container, Typography } from "@mui/material";
import { FilterLowRisk, FilterUnwantedAdverse } from "../Utils/FilterFunctions";
import AdverseEvent from "./AdverseEvent";

export default function AdverseEventsHigh({ adverseEvents }) {
  const risks = FilterUnwantedAdverse(adverseEvents);
  const filteredRisks = FilterLowRisk(risks);
  const sortedRisks = filteredRisks.sort((a, b) => b.riskScore - a.riskScore);

  return (
    <Box>
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

      {/* Conditional rendering based on the length of sortedRisks */}
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
