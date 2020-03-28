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
    <>
      {colors.map((_, index) => {
        return (
          <div
            key={index}
            css={css`
              /* margin: 10px; */
              height: ${boxSize}px;
              width: ${boxSize}px;
              background-color: ${chroma.random().hex()};
              font-size: 24px;
              /* border-radius: 4px; */
            `}
          />
        );
      })}
    </>
  );
};

export default Boxes;
