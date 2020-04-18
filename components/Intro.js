import React from "react";
import { css } from "@emotion/core";

import Hello from "./Hello";
import BodyText from "./BodyText";

const Intro = ({
  setIsContributeFormActive,
  parsedIp,
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
            <Hello parsedIp={parsedIp} />
            <BodyText setIsContributeFormActive={setIsContributeFormActive} />
          </div>
        </>
      )}
    </>
  );
};

export default Intro;
