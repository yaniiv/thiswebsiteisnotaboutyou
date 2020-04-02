import React, { useState } from "react";
import chroma from "chroma-js";
import { css } from "@emotion/core";
import Icon from "./Icon";

const colors = chroma
  .scale(["#fafa6e", "#2A4858"])
  .mode("lch")
  .colors(200);

console.warn("colors", colors);

function getIconStyles(boxSize) {
  return css`
    /* stroke: white; */
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
    height: 60px;
    width: 60px;
  `;
}

const handleBoxClick = index => {
  console.warn("clicked me", e);
  return;
};

const Boxes = ({ boxSize }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  console.warn("selectedIndex", selectedIndex);
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
          display: flex;
          pointer-events: none;
          align-items: center;
          justify-content: center;
          opacity: 0;

          ${selectedIndex !== -1 &&
            css`
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
                transition-property: background-color;
                transition-duration: 1s;
                transition-delay: 0.5s;
                background-color: ${colors[selectedIndex]};
              `}
          `}
        >
          <Icon stroke="red" css={getIconStyles(boxSize)} name="close" />
        </div>
      </div>

      {colors.map((_, index) => {
        const isSelectedSquare = selectedIndex === index;
        return (
          <div
            onClick={() => setSelectedIndex(index)}
            key={index}
            css={css`
              height: ${boxSize}px;
              width: ${boxSize}px;
              flex-basis: ${boxSize}px;
              background-color: ${chroma.random().hex()};
              font-size: 24px;
              border: 1px solid #036cdb;

              :hover {
                /* border-radius: 4px; */
                /* background-color: black; */
                /* margin-top: -24px; */
                /* margin-left: -24px; */
                /* transform: translateY(-24px); */
                /* transform: translateX(-24px); */
              }

              ${selectedIndex !== -1 &&
                css`
                  border: 0;

                  transition-property: background-color;
                  transition-duration: 3s;
                  background-color: white;
                `}

              ${isSelectedSquare &&
                css`
                  background-color: ${chroma.random().hex()};
                  flex-basis: 900px;
                  position: fixed;
                  /* width: 100vw;
                  height: 100vh; */
                  /* height: 20%; */
                  transition-property: flex-basis;
                  transition-duration: 3s;
                `}
            `}
          />
        );
      })}
    </div>
  );
};

export default Boxes;
