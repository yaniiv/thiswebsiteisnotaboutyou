import React from "react";
import { css } from "@emotion/core";
import Icon from "./Icon";

const CloseIcon = ({ handleClick, addedCss }) => (
  <div onClick={handleClick}>
    <Icon
      css={css`
        border: 2px solid #036cdb;
        cursor: pointer;
        float: right;
        top: 0;
        right: 0;
        background-color: white;
        position: absolute;
        stroke-width: 2;
        z-index: 900;

        height: 36px;
        width: 36px;
        transform: translate(calc(100% + 6px), -2px);

        @media (min-width: 768px) {
          transform: translate(calc(100% + 10px), 0%);

          height: 60px;
          width: 60px;
        }

        &:hover {
          background-color: white;
        }
        ${addedCss && addedCss}
      `}
      name="close"
      stroke="red"
      fill="white"
    />
  </div>
);

export default CloseIcon;
