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
    <div css={css``}>
      <div
        css={css`
          position: fixed;
          z-index: 50;
          top: 50%;
          left: 50%;
          display: none;
          transform: translate(-50%, -50%);

          ${isBoxSelected &&
          css`
            display: flex;
          `}
        `}
      >
        <div
          onClick={() => setSelectedIndex(-1)}
          css={css`
            background-color: white;
            width: 600px;
            height: 600px;
            border: 2px solid #036cdb;
            ${isBoxSelected &&
            css`
              background-color: ${selectedColor};
            `}
          `}
        >
          <div
            onClick={() => {
              setSelectedIndex(-1);
            }}
            css={css`
              :hover {
                cursor: pointer;
                svg {
                  stroke: red;
                }
              }
            `}
          >
            <Icon
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
                transform: translate(calc(100% + 20px), 0%);
                border: 2px solid #036cdb;
              `}
              name="close"
            />
          </div>
          <div>From: Date: Text:</div>
        </div>
      </div>
    </div>
  );
};

export default SelectedBox;
