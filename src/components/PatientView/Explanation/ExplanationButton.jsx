import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { calculateColor, calculateRisk } from "../../Utils/Calculator";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Box, IconButton, Avatar } from "@mui/material";
import Modal from "@mui/material/Modal";
import ExplanationModal from "./ExplanationModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ExplanationButton({ risk, riskRange }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Avatar size="small" sx={{ width: 24, height: 24, bgcolor: "#414bb2" }}>
        <IconButton
          aria-label="question"
          size="small"
          sx={{ color: "white" }}
          onClick={handleOpen}
        >
          <QuestionMarkIcon fontSize="inherit" />
        </IconButton>
      </Avatar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={
            (style,
            {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500, // Set your desired width here
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            })
          }
        >
          <ExplanationModal risk={risk} riskRange={riskRange} />
        </Box>
      </Modal>
    </div>
  );
}