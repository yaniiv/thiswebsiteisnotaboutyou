import React from "react";
import { css } from "@emotion/core";

import Icon from "./Icon";

import { bodyContent } from "../cms-content";

const links = [
  { href: "https://zeit.co/now", label: "ZEIT" },
  { href: "https://github.com/zeit/next.js", label: "GitHub" },
].map((link) => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

function getIconStyles(boxSize) {
  return css`
    /* stroke: white; */
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
    /* svg {
      height: ${boxSize - 10}px;
      width: ${boxSize - 10}px;
    } */
  `;
}

const Nav = ({ setShowBodyContent, boxSize, showBodyContent }) => {
  console.warn("boxSize", boxSize);
  return (
    <nav>
      {showBodyContent && (
        <div
          onClick={() => {
            setShowBodyContent(false);
          }}
          css={css`
            top: 0;
            right: 0;
            position: fixed;
            height: 90px;
            width: 90px;
            background: transparent;
            :hover {
              cursor: pointer;
            }
          `}
        >
          <Icon stroke="white" css={getIconStyles(boxSize)} name="close" />
        </div>
      )}
      {/*!showBodyContent && (
        <div
          css={css`
            top: 0;
            right: 0;
            position: fixed;
            width: ${boxSize}px;
            height: ${boxSize}px;
            background: white;
            :hover {
              cursor: pointer;
            }

            ${showBodyContent &
            css`
              display: none;
            `}
          `}
          onClick={() => {
            setShowBodyContent(true);
          }}
        >
          <Icon stroke="red" css={getIconStyles(boxSize)} name="info" />
        </div>
        ) */}
    </nav>
  );
};

export default Nav;
