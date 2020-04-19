import React from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";

import { formatUtcToHumanReadable } from "../helpers";

import Icon from "./Icon";

const getSelectedBox = ({ selectedIndex, contributions }) => {
  const selectedBox = contributions[selectedIndex] || {};
  const { ip, createdAt, color, canvas } = selectedBox;

  const paresedDate = formatUtcToHumanReadable(createdAt);

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
  canvasSize,
}) => {
  console.warn("contributions", contributions);
  const { locationString, created, color, canvas } = getSelectedBox({
    selectedIndex,
    contributions,
  });
  console.warn("locationString", locationString);

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
              css={css`
                background-color: white;
                width: ${canvasSize}px;
                height: ${canvasSize}px;
                border: 2px solid #036cdb;
                background-color: ${color};
                cursor: not-allowed;
              `}
            >
              <CanvasDraw
                canvasWidth={canvasSize}
                canvasHeight={canvasSize}
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
                <div
                  css={css`
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    font-size: 18px;
                    transform: translate(0%, calc(100% + 2px));
                  `}
                >
                  Contributed on {created}
                  {locationString && locationString}
                </div>

                <Icon
                  css={css`
                    cursor: pointer;
                    fill: none;
                    float: right;
                    top: 0;
                    right: 0;
                    position: absolute;
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SelectedBox;
