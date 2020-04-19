import React from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";

import { formatUtcToHumanReadable } from "../helpers";

import CloseIcon from "./CloseIcon";

const getSelectedBox = ({ selectedIndex, contributions }) => {
  const selectedBox = contributions[selectedIndex] || {};
  console.warn("selectedBox", selectedBox);

  const { ip, createdAt, color, canvas, locationString } = selectedBox;

  const paresedDate = formatUtcToHumanReadable(createdAt);

  return {
    ip,
    color,
    canvas,
    locationString,
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
                css={css`
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  font-size: 14px;
                  @media (min-width: 768) {
                    font-size: 18px;
                  }
                  transform: translate(0%, calc(100% + 2px));
                `}
              >
                Contributed on {created}
                {locationString && locationString}
              </div>
              <CloseIcon
                handleClick={() => {
                  setSelectedIndex(-1);
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SelectedBox;
