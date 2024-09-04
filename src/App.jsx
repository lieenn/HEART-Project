import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import patientView from "./Json files 2 patients/patientView.json";
import Box from "@mui/material/Box";
import MainView from "./components/AggregateView/MainView";
import DetailPage from "./components/PatientView/DetailPage";
import RiskRangeInput from "./components/RiskRangeInput";

//** [mininmal, moderate, moderate high, high] */
export const riskRange = [0.4, 0.6, 0.8, 1];

export default function App() {
  const [currentRiskRange, setCurrentRiskRange] = useState(riskRange);

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <RiskRangeInput onChange={setCurrentRiskRange} />
        <Routes>
          <Route
            path="/"
            element={
              <MainView
                riskRange={currentRiskRange}
                patientData={patientView}
              />
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
