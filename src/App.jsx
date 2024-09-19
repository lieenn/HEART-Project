import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import patientView from "./SampleData/patientView.json";
import aggregate from "./SampleData/aggregate.json";
import Box from "@mui/material/Box";
import MainView from "./components/AggregateView/MainView";
import DetailPage from "./components/PatientView/DetailPage";
import RiskRangeInput from "./components/SharedComponents/RiskRangeInput";

/**
 * @constant {Array<number>} riskRange - Defines risk thresholds [minimal, moderate, moderate high, high].
 */
export const riskRange = [0.4, 0.6, 0.8, 1];

/**
 * Main application component.
 * @returns {JSX.Element} The rendered application
 */
export default function App() {
  /**
   * @constant {Array<number>} currentRiskRange - Current risk range state.
   * @constant {function} setCurrentRiskRange - Function to update currentRiskRange.
   */
  const [currentRiskRange, setCurrentRiskRange] = useState(riskRange);

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <RiskRangeInput onChange={setCurrentRiskRange} />
        <Routes>
          <Route
            path="/"
            element={
              <MainView riskRange={currentRiskRange} patientData={aggregate} />
            }
          />
          <Route
            path=":value"
            element={
              <DetailPage
                riskRange={currentRiskRange}
                patientData={patientView}
              />
            }
          />
        </Routes>
      </Box>
    </Container>
  );
}
