import React from "react";
import { css } from "@emotion/core";

import Icon from "./Icon";
import CanvasDraw from "react-canvas-draw";

const SelectedBox = ({ selectedIndex, setSelectedIndex, colors }) => {
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
      <div
        css={css`
          display: none;
          align-items: center;
          justify-content: center;
          flex-direction: center;

          ${isBoxSelected &&
          css`
            display: flex;
            transition-property: opacity;
            transition-duration: 1s;
            border: 1px solid #036cdb;
          `}
        `}
      >
        <div
          onClick={() => setSelectedIndex(-1)}
          css={css`
            background-color: white;
            width: 600px;
            height: 600px;
            position: fixed;
            border: 1px solid #036cdb;
            ${isBoxSelected &&
            css`
              background-color: ${selectedColor};
            `}
          `}
        >
          <Icon
            stroke="white"
            css={css`
              cursor: pointer;
              fill: none;
              float: right;
              top: 0;
              right: 0;
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: 2;
              height: 60px;
              width: 60px;
            `}
            onClick={() => {
              setSelectedIndex(-1);
            }}
            name="close"
          />
          <div>From: Date: Text:</div>
          <CanvasDraw {...canvasProps} />
        </div>
      </div>
    </div>
  );
};

export default SelectedBox;
