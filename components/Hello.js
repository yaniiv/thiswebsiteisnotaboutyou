import React from "react";
import { css } from "@emotion/core";

const Hello = ({ parsedIp }) => {
  return (
    <div
      css={css`
        position: fixed;
        top: 200px;
        background: white;
      `}
    >
      Hello,
      <span
        css={css`
          color: blueviolet;
          text-decoration: underline;
        `}
      >
        {" "}
        {parsedIp || "11.111.111.111"}{" "}
      </span>
      , welcome!
    </div>
  );
};

export default Hello;
