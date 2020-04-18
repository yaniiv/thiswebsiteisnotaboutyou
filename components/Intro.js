import React from "react";
import { css } from "@emotion/core";

import Hello from "./Hello";
import BodyText from "./BodyText";

const Intro = ({
  setIsContributeFormActive,
  clientIp,
  showBodyContent,
  isBoxSelected,
}) => {
  return (
    <>
      {showBodyContent && !isBoxSelected && (
        <>
          <div
            css={css`
              position: relative;
              z-index: 69;
            `}
          >
            <Hello clientIp={clientIp} />
            <BodyText setIsContributeFormActive={setIsContributeFormActive} />
          </div>
        </>
      )}
    </>
  );
};

export default Intro;
