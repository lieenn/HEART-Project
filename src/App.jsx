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

export const riskRange = [0.4, 0.6, 0.8, 1];

export default function App() {
  // Existing state
  const [currentRiskRange, setCurrentRiskRange] = useState(riskRange);
  const [view, setView] = useState("view1");
  const [direction, setDirection] = useState("horizontal");
  const [borderline, setBorderline] = useState("borderline1");
  const [riskLabel, setRiskLabel] = useState("label1");
  const [los, setLos] = useState("los1");
  const [showUncertainty, setShowUncertainty] = useState("show");

  // MainView
  const [selectedAdverseEvents, setSelectedAdverseEvents] = useState([]);
  const [sortingOption, setSortingOption] = useState("Overall highest");
  const [favoritePatients, setFavoritePatients] = useState([]);
  const [showOnlyPinned, setShowOnlyPinned] = useState(false);

  // Handler functions
  const handleToggleFavorite = (patientId) => {
    setFavoritePatients((prev) => {
      if (prev.includes(patientId)) {
        return prev.filter((id) => id !== patientId);
      }
      return [...prev, patientId];
    });
  };

  const handleToggleShowPinned = () => {
    setShowOnlyPinned(!showOnlyPinned);
  };

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
                selectedAdverseEvents={selectedAdverseEvents}
                setSelectedAdverseEvents={setSelectedAdverseEvents}
                sortingOption={sortingOption}
                setSortingOption={setSortingOption}
                favoritePatients={favoritePatients}
                handleToggleFavorite={handleToggleFavorite}
                showOnlyPinned={showOnlyPinned}
                handleToggleShowPinned={handleToggleShowPinned}
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
                favoritePatients={favoritePatients}
                handleToggleFavorite={handleToggleFavorite}
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
