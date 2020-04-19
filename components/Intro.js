import React from "react";

import { css } from "@emotion/core";

import Hello from "./Hello";
import BodyText from "./BodyText";

const Intro = ({
  setIsContributeFormActive,
  reflection,
  showIntroContent,
  isBoxSelected,
}) => {
  const { clientIp, geoIpData } = reflection;

  return (
    <>
      {showIntroContent && !isBoxSelected && (
        <>
          <div
            css={css`
              position: relative;
              z-index: 69;
            `}
          >
            <Hello geoIpData={geoIpData} clientIp={clientIp} />
            <BodyText setIsContributeFormActive={setIsContributeFormActive} />
          </div>
        </>
      )}
    </>
  );
};

export default Intro;
