import React from "react";
import { css } from "@emotion/core";

import { bodyContent } from "../cms-content";

const BodyText = () => {
  return (
    <>
      {bodyContent.map((section, index) => (
        <div
          key={index}
          css={css`
            position: fixed;
            background: white;
            padding: 10px;
            top: ${section.top};
            left: ${section.left};
            width: ${section.width};
          `}
        >
          {section.text}
        </div>
      ))}
    </>
  );
};

export default BodyText;
