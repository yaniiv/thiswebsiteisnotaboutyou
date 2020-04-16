import React from "react";
import { css } from "@emotion/core";

const Boxes = ({ boxSize, colors, isBoxSelected, setSelectedIndex }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {colors.map((color, index) => {
        return (
          <div
            onClick={() => {
              setSelectedIndex(index);
            }}
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
                box-shadow: 0px 15px 65px -7px rgba(0, 0, 0, 0.2),
                  0px 24px 38px 3px rgba(0, 0, 0, 0.14),
                  0px 9px 46px 8px rgba(0, 0, 0, 0.12);
                color: rgba(0, 0, 0, 0.87);
                border: 3px solid #036cdb;
              }
            `}
          />
        );
      })}
    </div>
  );
};

export default Boxes;
