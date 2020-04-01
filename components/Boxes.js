import React from "react";
import chroma from "chroma-js";
import { css, jsx, Global, keyframes } from "@emotion/core";

const numBoxes = 200;
const boxes = new Array().fill(0, numBoxes - 1);
const colors = chroma
  .scale(["#fafa6e", "#2A4858"])
  .mode("lch")
  .colors(200);

const Boxes = ({ boxSize }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {colors.map((_, index) => {
        return (
          <div
            key={index}
            css={css`
              height: ${boxSize}px;
              width: ${boxSize}px;
              background-color: ${chroma.random().hex()};
              font-size: 24px;
              /* border-radius: 4px; */
            `}
          />
        );
      })}
    </div>
  );
};

export default Boxes;
