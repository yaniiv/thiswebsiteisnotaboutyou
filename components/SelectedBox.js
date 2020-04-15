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
          top: 50%;
          left: 50%;
          display: none;
          margin: 0 auto;
          align-items: center;
          justify-content: center;
          transform: translate(-50%, -50%);

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
