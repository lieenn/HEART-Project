import { Route, Routes } from "react-router-dom";
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MainView from "./components/AggregateView/MainView";
import DetailPage from "./components/PatientView/DetailPage";

// Max range of risk values
// [Mininal, Moderate, Moderate High, High]
export const riskRange = [0.3, 0.5, 0.7, 1];

export default function App() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path=":value" element={<DetailPage />} />
        </Routes>
      </Box>
    </Container>
  );
}
