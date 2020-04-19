import React from "react";

import { css, keyframes } from "@emotion/core";

import Hello from "./Hello";
import Icon from "./Icon";

const fadeIn = keyframes`
  from, 20%, 53%, 70%, to {
    opacity: 0;
  }

  /* 40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  } */
  100% {
    opacity: 1;
  }
`;

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
          > div {
            width: 200px;
            font-size: 16px;
            position: fixed;
            background: white;
            padding: 10px;
            border: 1px solid #036cdb;
            animation: 0.75s ${fadeIn} ease;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;

            @media (min-width: 768px) {
              font-size: 22px;
              width: 400px;
            }
          }
        `}
      >
        <div
          css={css`
            top: calc(15% + 68px);
            opacity: 0;
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
          each note was left by a visitor
        </div>
        <div
          css={css`
            left: 26%;
            top: calc(36% + 68px);
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
              &:hover {
                cursor: pointer;
                color: #036cdb;
              }
            `}
            onClick={() => setIsContributeFormActive(true)}
          >
            contributed
          </span>{" "}
          to the wall and helped to create something with the other people that
          have been here
          {showIntroContent && !isContributeFormActive && (
            <div
              onClick={() => {
                setShowIntroContent(false);
              }}
              css={css`
                position: absolute;
                top: 0;
                right: 0;
                border: 2px solid #036cdb;
                background: transparent;
                transform: translate(50%, -50%);

                width: 36px;
                height: 36px;
                @media (min-width: 768px) {
                  width: 54px;
                  height: 54px;
                }

                :hover {
                  background-color: white;
                  cursor: pointer;
                }
              `}
            >
              <Icon
                css={css`
                  fill: none;
                  stroke-width: 2;
                `}
                stroke="red"
                name="close"
              />
            </div>
          )}
        </div>
        <div
          css={css`
            top: calc(58% + 120px);
            left: calc(32% + 22px);
            width: 200px !important;

            @media (min-width: 768px) {
              top: calc(58% + 140px);

              width: 290px !important;
            }
          `}
        >
          but you'll never see your own contributions on your screen.
        </div>
      </div>
    </div>
  );
};

export default Intro;
