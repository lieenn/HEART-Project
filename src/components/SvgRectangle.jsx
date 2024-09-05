import React from "react";
import { Box } from "@mui/material";

/**
 * SvgRectangle Component
 *
 * This component renders a rectangle with rounded corners, text inside, and optional border styling.
 *
 * @param {Object} props - The component properties.
 * @param {number} props.width - The width of the rectangle.
 * @param {number} props.height - The height of the rectangle.
 * @param {string} props.fill - The fill color of the rectangle.
 * @param {string} props.stroke - The stroke color of the rectangle (border).
 * @param {number} props.strokeWidth - The width of the stroke (border).
 * @param {string} props.textColor - The color of the text inside the rectangle.
 * @param {string} props.text - The text to display inside the rectangle.
 * @param {string} [props.textAnchor="middle"] - The text alignment inside the rectangle ("start", "middle", "end").
 * @param {React.ReactNode} [props.children] - Optional children elements to render inside the rectangle (e.g., icons).
 * @returns {JSX.Element} - The rendered SVG rectangle component.
 */
export default function SvgRectangle({
  width,
  height,
  fill,
  textColor,
  text,
  textAnchor = "middle",
  children,
}) {
  // Determine the x position based on textAnchor
  const xPosition =
    textAnchor === "start" ? 10 : textAnchor === "end" ? width - 10 : width / 2;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        mb: 1,
        mr: 2,
        position: "relative",
        border: "2px solid black",
        borderRadius: "8px",
        overflow: "hidden",
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <svg width={width} height={height}>
        <rect width={width} height={height} fill={fill} />
        <text
          x={xPosition}
          y="55%"
          dominantBaseline="middle"
          textAnchor={textAnchor}
          fontSize="16"
          fontFamily="Roboto"
          fontWeight="500"
          fill={textColor}
        >
          {text}
        </text>
        {children}
      </svg>
    </Box>
  );
}
