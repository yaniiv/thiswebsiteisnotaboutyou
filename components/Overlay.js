import React from "react";
import { css } from "@emotion/core";

const Overlay = ({
  isBoxSelected,
  setSelectedIndex,
  isContributeFormActive,
  setIsContributeFormActive,
}) => {
  return (
    <>
      {(isBoxSelected || isContributeFormActive) && (
        <div
          onClick={() => {
            setIsContributeFormActive(false);
            setSelectedIndex(-1);
          }}
          css={css`
            height: 100%;
            width: 100%;
            position: fixed;
            z-index: 10;
            background: white;
            opacity: 0.75;
          `}
        />
      )}
    </>
  );
};

export default Overlay;
