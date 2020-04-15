import React from "react";
import { css } from "@emotion/core";

const Hello = ({ parsedIp }) => {
  return (
    <div
      css={css`
        position: fixed;
        top: 200px;
        padding: 10px;
        border: 1px solid #036cdb;
        background: white;
      `}
    >
      Hello{" "}
      <span
        css={css`
          color: blueviolet;
          text-decoration: underline;
        `}
      >
        {parsedIp || "11.111.111.111"}
        {", "}
      </span>
    </div>
  );
};

export default Hello;
