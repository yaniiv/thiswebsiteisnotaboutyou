import React from "react";
import { css } from "@emotion/core";

const Hello = ({ clientIp }) => {
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
        {clientIp}
      </span>
    </div>
  );
};

export default Hello;
