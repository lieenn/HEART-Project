import { List, ListItem, Box, Typography } from "@mui/material";
import {
  FilterHighRisk,
  FilterUnwantedAdverse,
} from "../Utils/FilterFunctions";
import AdverseEvent from "./AdverseEvent";

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
            width: "100%", // Ensure the Box takes full width of the Container
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
      <List>
        {sortedRisks.map((item, index) => (
          <ListItem key={index}>
            <AdverseEvent adverseEvent={item} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
