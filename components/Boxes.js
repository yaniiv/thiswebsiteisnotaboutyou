import React, { useState } from "react";
import chroma from "chroma-js";
import { css } from "@emotion/core";

const numBoxes = 200;
const colors = chroma
  .scale(["#fafa6e", "#2A4858"])
  .mode("lch")
  .colors(200);

const handleBoxClick = index => {
  console.warn("clicked me", e);
  return;
};

const Boxes = ({ boxSize }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
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

              :hover {
                /* border-radius: 4px; */
                background-color: black;
                /* margin-top: -24px; */
                /* margin-left: -24px; */
                /* transform: translateY(-24px); */
                /* transform: translateX(-24px); */
              }

              ${isSelectedSquare &&
                css`
                  /* background-color: white; */
                  flex-basis: 900px;
                  background-color: black;

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
