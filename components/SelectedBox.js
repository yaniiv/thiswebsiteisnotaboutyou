import React from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";
import moment from "moment";

import Icon from "./Icon";

const getSelectedBox = ({ selectedIndex, contributions }) => {
  const selectedBox = contributions[selectedIndex] || {};
  const { ip, createdAt, color, canvas } = selectedBox;

  const paresedDate = moment
    .utc(createdAt)
    .format("dddd, MMMM Do YYYY, h:mm:ss");
  console.warn("paresedDate", paresedDate);

  return {
    ip,
    color,
    canvas,
    created: paresedDate,
  };
};

const SelectedBox = ({
  selectedIndex,
  setSelectedIndex,
  contributions,
  isBoxSelected,
}) => {
  const { ip, created, color, canvas } = getSelectedBox({
    selectedIndex,
    contributions,
  });

  console.warn(">>>>>>>> SELECTED BOX >>>>>>>");
  console.warn("ip", ip);
  console.warn("color", color);
  // console.warn("canvas", canvas);
  console.warn("created", created);

  return (
    <>
      {isBoxSelected && (
        <>
          <div
            css={css`
              position: fixed;
              z-index: 50;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              display: flex;
            `}
          >
            <div
              onClick={() => setSelectedIndex(-1)}
              css={css`
                background-color: white;
                width: 600px;
                height: 600px;
                border: 2px solid #036cdb;
                ${isBoxSelected &&
                css`
                  background-color: ${color};
                `}
              `}
            >
              <CanvasDraw
                canvasWidth={600}
                canvasHeight={600}
                gridColor={color}
                disabled={true}
                saveData={canvas}
                immediateLoading={false}
                hideInterface={true}
                style={{ background: color, pointerEvents: "none" }}
              />

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
                    transform: translate(calc(100% + 20px), 0%);
                    border: 2px solid #036cdb;
                  `}
                  name="close"
                />
              </div>
              <div>created: {created}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SelectedBox;
