import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
import patientView from "./SampleData/patientView.json";
import aggregate from "./SampleData/aggregate.json";
import fakeData from "./SampleData/fakeData.json";
import Box from "@mui/material/Box";
import MainView from "./components/AggregateView/MainView";
import DetailPage from "./components/PatientView/DetailPage";
import RiskRangeInput from "./components/SharedComponents/RiskRangeInput";
import ViewToggle from "./components/Controls/ViewToggle";
import BorderlineToggle from "./components/Controls/BorderlineToggle";
import DirectionToggle from "./components/Controls/DirectionToggle";
import Controls from "./components/Controls/Controls";
import RiskLabelToggle from "./components/Controls/RiskLabelToggle";
import LoSToggle from "./components/Controls/LoSToggle";
import UncertaintyToggle from "./components/Controls/UncertaintyToggle";

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
  const [view, setView] = useState("view1");
  const [direction, setDirection] = useState("horizontal");
  const [borderline, setBorderline] = useState("borderline1");
  const [riskLabel, setRiskLabel] = useState("label1");
  const [los, setLos] = useState("los1");
  const [showUncertainty, setShowUncertainty] = useState("show");
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Routes>
          <Route
            path="/"
            element={
              <MainView
                riskRange={currentRiskRange}
                patientData={aggregate.concat(fakeData)}
                view={view}
                direction={direction}
                borderline={borderline}
              >
                <Controls>
                  <RiskRangeInput onChange={setCurrentRiskRange} />
                  <ViewToggle view={view} setView={setView} />
                  <BorderlineToggle
                    borderline={borderline}
                    setBorderline={setBorderline}
                    view={view}
                  />
                  <DirectionToggle
                    direction={direction}
                    setDirection={setDirection}
                  />
                </Controls>
              </MainView>
            }
          />
          <Route
            path=":value"
            element={
              <DetailPage
                riskRange={currentRiskRange}
                patientData={patientView.concat(fakeData)}
                borderline={borderline}
                riskLabel={riskLabel}
                los={los}
                showUncertainty={showUncertainty}
              >
                <Controls>
                  <RiskRangeInput onChange={setCurrentRiskRange} />
                  <BorderlineToggle
                    borderline={borderline}
                    setBorderline={setBorderline}
                  />
                  <RiskLabelToggle
                    riskLabel={riskLabel}
                    setRiskLabel={setRiskLabel}
                  />
                  <UncertaintyToggle
                    showUncertainty={showUncertainty}
                    setShowUncertainty={setShowUncertainty}
                  />
                  <LoSToggle los={los} setLos={setLos} />
                </Controls>
              </DetailPage>
            }
          />
        </Routes>
      </Box>
    </Container>
  );
}
