import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
import { css } from "@emotion/core";
import Icon from "./Icon";

// const colors = chroma.scale(["#fafa6e", "#2A4858"]).mode("lch").colors(121);
function getIconStyles(boxSize) {
  return css`
    cursor: pointer;
    /* stroke: white; */
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
    height: 60px;
    width: 60px;
  `;
}

const SelectedBox = ({ selectedIndex, setSelectedIndex, colors }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
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
          opacity: 0;

          ${selectedIndex !== -1 &&
          css`
            display: flex;
            transition-property: opacity;
            transition-duration: 1s;
            opacity: 1;
          `}
        `}
      >
        <div
          onClick={() => setSelectedIndex(-1)}
          css={css`
            background-color: white;
            width: 600px;
            height: 600px;

            ${selectedIndex !== -1 &&
            css`
              background-color: ${colors[selectedIndex] || "white"};
            `}
          `}
        >
          <Icon
            stroke="red"
            css={getIconStyles()}
            onClick={() => {
              console.warn("icon close box click");
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
