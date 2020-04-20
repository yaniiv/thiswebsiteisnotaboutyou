import React from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";
import chroma from "chroma-js";

const Overlay = ({
  isBoxSelected,
  setSelectedIndex,
  isContributeFormActive,
  showIntroContent,
}) => {
  if (!isBoxSelected && !isContributeFormActive) {
    return null;
  }

  let overlayColor = chroma.random().darken().desaturate().hex();
  if (isContributeFormActive || isBoxSelected) {
    overlayColor = "white";
  }

  return (
    <div
      onClick={() => {
        setSelectedIndex(-1);
      }}
    >
      <CanvasDraw
        style={{
          position: "fixed",
          zIndex: 40,
          background: `${overlayColor}`,
          opacity: "0.825",
        }}
        disabled={true}
        hideGrid={true}
        canvasWidth={window.innerWidth}
        canvasHeight={window.innerHeight}
      />
    </div>
  );
};

export default Overlay;

/*         <div
     
          css={css`
            height: 100%;
            width: 100%;
            position: fixed;
            z-index: 10;
            background: white;
            opacity: 0.75;
          `}
        />*/
