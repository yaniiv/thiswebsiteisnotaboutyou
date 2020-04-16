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
  setShowBodyContent,
  boxSize,
  isBoxSelected,
  showBodyContent,
  setIsContributeFormActive,
}) => {
  console.warn("boxSize", boxSize);
  return (
    <nav
      css={css`
        top: 0;
        width: 100%;
        position: fixed;
        display: flex;
        justify-content: flex-end;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          border: 1px solid #036cdb;
        `}
      >
        <div
          onClick={() => {
            setIsContributeFormActive(true);
          }}
          css={css`
            margin: 20px 0;
            color: white;
            background: transparent;
            border: 1px solid #036cdb;
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
            setShowBodyContent(false);
          }}
          css={css`
            height: 90px;
            padding: 0 10px;
            border: 1px solid #036cdb;
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
              /* stroke-linecap: round; */
              /* stroke-linejoin: round; */
              stroke-width: 2;
            `}
            name="close"
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
