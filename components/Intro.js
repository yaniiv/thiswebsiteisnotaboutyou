import React from "react";

import { css } from "@emotion/core";

import Hello from "./Hello";
import Icon from "./Icon";

const Intro = ({
  setIsContributeFormActive,
  reflection,
  showIntroContent,
  isBoxSelected,
  setShowIntroContent,
  isContributeFormActive,
}) => {
  if (isBoxSelected || isContributeFormActive || !showIntroContent) {
    return null;
  }

  return (
    <div
      css={css`
        position: relative;
        z-index: 69;
      `}
    >
      <Hello reflection={reflection} />
      <div
        css={css`
          position: fixed;
          bottom: 0;
          right: 0;
          background: white;
          border: 2px solid #036cdb;
          padding: 4px;
          font-size: 14px;
        `}
      >
        <a
          href="https://www.yanivgoldobin.com"
          css={css`
            text-decoration: none;
          `}
          target="_blank"
        >
          built with{" "}
          <Icon
            css={css`
              stroke-width: 2;
            `}
            name="love"
            height="14px"
            width="14px"
            fill="#fcd116"
            stroke="#fcd116"
          />{" "}
          by{" "}
          <span
            css={css`
              text-decoration: underline;
            `}
          >
            {" "}
            yaniv
          </span>
        </a>
      </div>

      <div
        css={css`
          > div {
            width: 200px;
            font-size: 16px;
            position: fixed;
            background: white;
            padding: 10px;
            border: 2px solid #036cdb;

            @media (min-width: 768px) {
              font-size: 24px;
              width: 400px;
            }
          }
        `}
      >
        <div
          css={css`
            top: calc(15% + 68px);
            left: 4%;
          `}
        >
          This website is about everyone who's been here but you
        </div>
        <div
          css={css`
            top: 36%;
            left: 34%;
            width: 200px !important;

            @media (min-width: 768px) {
              width: 290px !important;
            }
          `}
        >
          each note was left by a visitor, click one to view it
        </div>
        <div
          css={css`
            left: 26%;
            top: calc(36% + 68px);

            @media (min-width: 768px) {
              top: calc(36% + 90px);
            }
          `}
        >
          every refresh surfaces 111 of the most recent contributions
        </div>
        <div
          css={css`
            top: 58%;
            left: 32%;
          `}
        >
          it would be wonderful if you{" "}
          <span
            css={css`
              text-decoration: underline;
              color: blue;
              cursor: pointer;
            `}
            onClick={() => {
              setShowIntroContent(false);
              setIsContributeFormActive(true);
            }}
          >
            contributed
          </span>{" "}
          to the wall and helped to create something with the other people that
          have been here
        </div>
        <div
          css={css`
            top: calc(58% + 120px);
            left: calc(32% + 22px);
            width: 200px !important;

            @media (min-width: 768px) {
              top: calc(58% + 150px);

              width: 290px !important;
            }
          `}
        >
          but you wont see your own contributions on the screen.
        </div>
      </div>
    </div>
  );
};

export default Intro;
