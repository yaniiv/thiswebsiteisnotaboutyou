import React from "react";
import { css } from "@emotion/core";

import Icon from "./Icon";

const SelectedBox = ({ selectedIndex, setSelectedIndex, colors }) => {
  const selectedColor = colors[selectedIndex] || "white";
  console.log(
    "%c selectedColor",
    selectedColor,
    `background: ${selectedColor};`
  );
  console.log("%c the green hulk got mad!", "color: green; font-weight: bold;");

  const isBoxSelected = selectedIndex !== -1;

  return (
    <div
      css={css`
        pointer-events: none;
      `}
    >
      <div
        css={css`
          position: fixed;
          width: 100%;
          height: 100%;
          display: none;
          align-items: center;
          justify-content: center;

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
        </div>
      </div>
    </div>
  );
};

export default SelectedBox;
