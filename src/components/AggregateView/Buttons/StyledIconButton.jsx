import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const StyledIconButton = styled(IconButton)(({ theme, isactive }) => ({
  padding: 0,
  color:
    isactive === "true"
      ? theme.palette.primary.main
      : theme.palette.action.active,
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "transparent",
  },
  "&:focus": {
    outline: "none",
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
}));

export default StyledIconButton;
