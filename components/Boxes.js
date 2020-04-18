import React from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";
import moment from "moment";

const Boxes = ({ boxSize, contributions }) => {
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
            css={css`
              height: ${boxSize}px;
              width: ${boxSize}px;
              flex-basis: ${boxSize}px;
              font-size: 24px;
              border: 1px solid #036cdb;
              box-sizing: border-box;
              cursor: pointer;

              :hover {
                border: 3px solid #036cdb;
                box-shadow: 0px 15px 65px -7px rgba(0, 0, 0, 0.2),
                  0px 24px 38px 3px rgba(0, 0, 0, 0.14),
                  0px 9px 46px 8px rgba(0, 0, 0, 0.12);
              }
            `}
          >
            {/* {moment(createdAt)} */}
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
