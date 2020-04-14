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

const handleBoxClick = (index) => {
  console.warn("clicked me", e);
  return;
};

const Boxes = ({ boxSize, colors, setSelectedIndex }) => {
  console.warn("RERENDER BOXES. boxSize:", boxSize);
  // console.warn("selectedIndex", selectedIndex);

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {colors.map((color, index) => {
        // const isSelectedSquare = selectedIndex === index;
        console.warn("RERENDER COLORS");
        return (
          <div
            onClick={() => setSelectedIndex(index)}
            key={index}
            css={css`
              height: ${boxSize}px;
              width: ${boxSize}px;
              flex-basis: ${boxSize}px;
              background-color: ${color};
              font-size: 24px;
              border: 1px solid #036cdb;
              box-sizing: border-box;
              cursor: pointer;

              :hover {
                border-radius: 20px;
                /* background-color: black; */
                /* margin-top: -24px; */
                /* margin-left: -24px; */
                /* transform: translateY(-24px); */
                /* transform: translateX(-24px); */
              }
            `}
          />
        );
      })}
    </div>
  );
};

export default Boxes;
