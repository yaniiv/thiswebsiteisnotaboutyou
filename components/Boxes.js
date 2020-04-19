import React from "react";
import { css } from "@emotion/core";
import moment from "moment";

import CanvasDraw from "react-canvas-draw";

const Boxes = ({
  boxSize,
  contributions,
  setSelectedIndex,
  setShowIntroContent,
}) => {
  const handleBoxClick = (index) => {
    setShowIntroContent(false);
    setSelectedIndex(index);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
      `}
    >
      {contributions.map(({ color, canvas, createdAt }, index) => {
        return (
          <div
            key={index}
            onClick={() => handleBoxClick(index)}
            css={css`
              height: ${boxSize}px;
              width: ${boxSize}px;
              flex-basis: ${boxSize}px;
              font-size: 24px;
              border: 1px solid #036cdb;
              box-sizing: border-box;
              cursor: pointer;
              position: relative;

              :hover {
                border: 3px solid #036cdb;
                box-shadow: 0px 15px 65px -7px rgba(0, 0, 0, 0.2),
                  0px 24px 38px 3px rgba(0, 0, 0, 0.14),
                  0px 9px 46px 8px rgba(0, 0, 0, 0.12);
              }
            `}
          >
            <div
              css={css`
                position: absolute;
                top: 0;
                left: 0;
                font-size: 8px;
              `}
            >
              {moment.utc(createdAt).format("MMMM Do YYYY, h:mma")}
            </div>
            <CanvasDraw
              canvasWidth={boxSize}
              canvasHeight={boxSize}
              gridColor={color}
              disabled={true}
              saveData={canvas}
              immediateLoading={false}
              hideInterface={false}
              style={{ background: color, pointerEvents: "none" }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Boxes;
