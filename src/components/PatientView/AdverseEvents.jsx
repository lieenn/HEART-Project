import { List, ListItem, Paper, Container } from "@mui/material";
import { FilterNoRisk, FilterUnwantedAdverse } from "../Utils/FilterFunctions";
import AdverseEvent from "./AdverseEvent";
import PatientRiskStatus from "../AggregateView/PatientRiskStatus";

export default function AdverseEvents({ adverseEvents = [] }) {
  // Default to an empty array
  console.log(adverseEvents);

  // Check if adverseEvents is an array
  if (!Array.isArray(adverseEvents)) {
    console.error(
      "Expected an array for adverseEvents but received:",
      typeof adverseEvents
    );
    return <div>Error: Adverse Events data is not available.</div>;
  }

  const risks = FilterUnwantedAdverse({
    patientAdverseEvents: adverseEvents,
    titles: ["Length of Stay", "Morbidity"],
  });
  const filteredRisks = FilterNoRisk({ patientAdverseEvents: risks });
  const sortedRisks = filteredRisks.sort((a, b) => b.riskScore - a.riskScore);

  return (
    <Container component={Paper} sx={{ bgcolor: "#efefef", mx: "auto" }}>
      <List>
        {sortedRisks.map((item, index) => (
          <ListItem key={index}>
            <AdverseEvent adverseEvent={item} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
