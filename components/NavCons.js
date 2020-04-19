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
  console.warn("isContributeFormActive", isContributeFormActive);
  console.warn(
    "showIntroContent && !isContributeFormActive",
    showIntroContent && !isContributeFormActive
  );
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
          setIsContributeFormActive((prevState) => !prevState);
        }}
        css={css`
          color: #036cdb;
          background: white;
          border: 2px solid #036cdb;
          position: fixed;
          top: 0px;
          padding: 8px;
          font-size: 16px;
          text-decoration: underline;

          @media (min-width: 768px) {
            font-size: 22px;
          }

          :hover {
            cursor: pointer;
            color: #036cdb;
            background-color: lightgray;
            text-decoration: underline;
          }
        `}
      >
        contribute
      </div>
      {!showIntroContent && (
        <div
          onClick={() => {
            setShowIntroContent(true);
          }}
          css={css`
            position: fixed;
            right: 0;
            border: 2px solid #036cdb;
            background-color: white;
            top: 50px;
            padding: 4px;

            :hover {
              background-color: lightgray;
              cursor: pointer;
            }

            height: 30px;
            width: 30px;
            @media (min-width: 768px) {
              height: 42px;
              width: 42px;
            }
          `}
        >
          <Icon
            css={css`
              stroke-width: 1.6;
              stroke-linejoin: round;
              stroke-linecap: round;
            `}
            name="info"
            stroke="#036cdb"
          />
        </div>
      )}
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
