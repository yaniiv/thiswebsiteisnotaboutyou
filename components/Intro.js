import React from "react";

import { css } from "@emotion/core";

import Hello from "./Hello";
import IntroText from "./IntroText";

const Intro = ({
  setIsContributeFormActive,
  reflection,
  showIntroContent,
  isBoxSelected,
  isContributeFormActive,
}) => {
  if (isBoxSelected || isContributeFormActive || !showIntroContent) {
    return null;
  }

  return (
    <div
      css={css`
        position: relative;
        z-index: 69;
      `}
    >
      <Hello reflection={reflection} />
      <IntroText setIsContributeFormActive={setIsContributeFormActive} />
    </div>
  );
};

export default Intro;
