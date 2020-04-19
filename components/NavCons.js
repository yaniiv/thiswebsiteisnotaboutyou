import React from "react";
import { css } from "@emotion/core";

import Icon from "./Icon";

// const links = [
//   { href: "https://zeit.co/now", label: "ZEIT" },
//   { href: "https://github.com/zeit/next.js", label: "GitHub" },
// ].map((link) => {
//   link.key = `nav-link-${link.href}-${link.label}`;
//   return link;
// });

const Nav = ({
  setShowIntroContent,
  boxSize,
  isBoxSelected,
  showIntroContent,
  setIsContributeFormActive,
  isContributeFormActive,
}) => {
  if (isBoxSelected || isContributeFormActive) {
    return null;
  }
  console.warn("boxSize", boxSize);
  return (
    <nav
      css={css`
        top: 0;
        right: 0;
        position: fixed;
        z-index: 50;
        display: flex;
        justify-content: flex-end;
      `}
    >
      <div
        onClick={() => {
          setIsContributeFormActive((prevState) => !prevState);
        }}
        css={css`
          color: white;
          background: transparent;
          border: 2px solid #036cdb;
          position: fixed;
          top: 110px;
          :hover {
            cursor: pointer;
            color: blue;
            text-decoration: underline;
          }
        `}
      >
        contribute
      </div>
      <div
        onClick={() => {
          setShowIntroContent(false);
        }}
        css={css`
          height: 90px;
          border: 2px solid #036cdb;
          width: 90px;
          background: transparent;
          :hover {
            cursor: pointer;
            svg {
              stroke: red;
            }
          }
        `}
      >
        <Icon
          css={css`
            fill: none;
            stroke-width: 2;
          `}
          name="close"
        />
      </div>
    </nav>
  );
};

export default Nav;
