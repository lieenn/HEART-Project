import React from "react";

export default function PercentageBox({ contribution, boxColor }) {
  const containerStyle = {
    width: "76px",
    height: "24px",
    backgroundColor: "#fff",
    borderRadius: "3px",
    overflow: "hidden",
    border: "1px solid #000",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const fillStyle = {
    width: `${contribution.weight * 100}%`,
    height: "100%",
    backgroundColor: boxColor,
    position: "absolute",
    left: 0,
    top: 0,
  };

  const textStyle = {
    position: "relative",
    zIndex: 1,
    fontSize: "12px",
    fontWeight: "bold",
    color: contribution.weight > 0.5 ? "#fff" : "#000",
  };

  return (
    <div style={containerStyle}>
      <div style={fillStyle}></div>
      <span style={textStyle}>{(contribution.weight * 100).toFixed(2)}%</span>
    </div>
  );
}
