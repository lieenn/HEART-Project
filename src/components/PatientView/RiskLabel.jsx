import { Typography } from "@mui/material";

export default function ({ adverseEvent, isHighRisk }) {
  return (
    <Typography
      fontWeight="bold"
      color="black"
      sx={{ mt: isHighRisk ? 1 : 0.5 }}
    >
      Risk: {Math.round(adverseEvent.riskScore * 100)}%
    </Typography>
  );
}
