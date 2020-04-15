import React from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";

const Contribute = ({ selectedIndex, setSelectedIndex, colors }) => {
  const selectedColor = colors[selectedIndex] || "white";
  const canvasProps = {
    onChange: null,
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushRadius: 12,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 400,
    canvasHeight: 400,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false,
  };
  console.log(
    "%c selectedColor",
    selectedColor,
    `background: ${selectedColor};`
  );
  console.log("%c the green hulk got mad!", "color: green; font-weight: bold;");

  const isBoxSelected = selectedIndex !== -1;

  return (
    <div css={css``}>
      <CanvasDraw {...canvasProps} />
    </div>
  );
};

export default Contribute;
