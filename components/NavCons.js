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
  setSelectedIndex,
  setIsContributeFormActive,
  isContributeFormActive,
}) => {
  if (isContributeFormActive) return null;
  return (
    <nav
      css={css`
        top: 0;
        right: 0;
        position: fixed;
        z-index: 1000;
        display: flex;
        justify-content: flex-end;
      `}
    >
      <div
        onClick={() => {
          setSelectedIndex(-1);
          setShowIntroContent(false);
          setIsContributeFormActive((prevState) => !prevState);
        }}
        css={css`
          color: blue;
          background: white;
          border: 2px solid #036cdb;
          position: fixed;
          top: 0px;
          padding: 8px;
          font-size: 20px;
          text-decoration: underline;

          @media (min-width: 768px) {
            font-size: 22px;
          }

          :hover {
            cursor: pointer;
            text-decoration: underline;
          }
        `}
      >
        contribute
      </div>
      <div
        onClick={() => {
          setSelectedIndex(-1);
          setIsContributeFormActive(false);
          setShowIntroContent((prevState) => !prevState);
        }}
        css={css`
          position: fixed;
          right: 0;
          border: 2px solid #036cdb;
          background-color: white;
          padding: 4px;

          :hover {
            cursor: pointer;
          }

          top: 46px;

          height: 30px;
          width: 30px;
          @media (min-width: 768px) {
            top: 48px;
            height: 36px;
            width: 36px;
          }
        `}
      >
        {!showIntroContent ? (
          <Icon
            css={css`
              stroke-width: 1.6;
              stroke-linejoin: round;
              stroke-linecap: round;
            `}
            name={"question"}
            stroke="blue"
          />
        ) : (
          <Icon
            css={css`
              stroke-width: 1.6;
            `}
            name={"close"}
            stroke="red"
          />
        )}
      </div>
    </nav>
  );
};

export default Nav;
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#000000"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10"></circle>
  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
  <line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg>;
