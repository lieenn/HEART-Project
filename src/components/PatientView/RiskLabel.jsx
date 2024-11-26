import { Typography } from "@mui/material";

export default function ({ adverseEvent, isHighRisk, isModal }) {
  return (
    <Typography
      fontWeight="bold"
      color="black"
      sx={{ mt: isHighRisk ? 1 : 0, ml: !isHighRisk && !isModal ? 3 : 0 }}
    >
      Risk: {Math.round(adverseEvent.riskScore * 100)}%
    </Typography>
  );
}
