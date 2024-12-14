import React, { useMemo } from "react"; // Import useMemo
import { List, ListItem, Box, Typography } from "@mui/material";
import AdverseEvent from "./AdverseEvent";
import { FilterUnwantedAdverse } from "../Utils/FilterFunctions";
import SortLowRisk from "./SortLowRisk";

export default function AdverseEventsList({
  adverseEvents,
  riskFilter,
  header,
  bgColor,
  riskRange,
  borderline,
  isLowRisk,
  riskLabel,
  showUncertainty,
}) {
  const [sort, setSort] = React.useState("risk");

  const sortedRisks = useMemo(() => {
    const risks = FilterUnwantedAdverse(adverseEvents);
    const filteredRisks = riskFilter(risks, riskRange);

    if (sort === "risk") {
      return [...filteredRisks].sort((a, b) => b.riskScore - a.riskScore);
    } else {
      return [...filteredRisks].sort((a, b) => {
        return b.confidenceInterval.high - a.confidenceInterval.high;
      });
    }
  }, [adverseEvents, riskFilter, riskRange, sort]);

  return (
    <>
      {isLowRisk && <SortLowRisk sort={sort} setSort={setSort} />}

      {sortedRisks.length > 0 ? (
        <List>
          {sortedRisks.map((risk, index) => (
            <ListItem key={index}>
              <AdverseEvent
                adverseEvent={risk}
                riskRange={riskRange}
                borderline={borderline}
                riskLabel={riskLabel}
                showUncertainty={showUncertainty}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography sx={{ m: 2, fontStyle: "italic" }}>
          No {header && header.toLowerCase()} found.
        </Typography>
      )}
    </>
  );
}
