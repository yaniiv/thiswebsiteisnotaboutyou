import React from "react";
import { css } from "@emotion/core";

// import { bodyContent } from "../cms-content";

const IntroText = ({ setIsContributeFormActive }) => {
  return (
    <div
      css={css`
        > div {
          width: 200px;
          font-size: 16px;

          @media (min-width: 768px) {
            font-size: 22px;
            width: 400px;
          }
        }
      `}
    >
      <div
        css={css`
          position: fixed;
          background: white;
          padding: 10px;
          border: 1px solid #036cdb;
          top: 21%;
          left: 8%;
        `}
      >
        This website is about everyone who's been here but you
      </div>
      <div
        css={css`
          position: fixed;
          background: white;
          padding: 10px;
          border: 1px solid #036cdb;
          top: 36%;
          left: 34%;
        `}
      >
        each note was left by a visitor
      </div>
      <div
        css={css`
          position: fixed;
          background: white;
          padding: 10px;
          border: 1px solid #036cdb;
          top: 42%;
          left: 26%;
        `}
      >
        every refresh surfaces a random sample of 200 notes
      </div>
      <div
        css={css`
          position: fixed;
          background: white;
          padding: 10px;
          border: 1px solid #036cdb;
          top: 58%;
          left: 48%;
        `}
      >
        it would be wonderful if you{" "}
        <span
          css={css`
            text-decoration: underline;
            color: blue;
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={() => setIsContributeFormActive(true)}
        >
          contributed
        </span>{" "}
        to the wall and helped to create something with the other people that
        have been here
      </div>
      <div
        css={css`
          position: fixed;
          background: white;
          padding: 10px;
          border: 1px solid #036cdb;
          top: 73%;
          left: 54%;
        `}
      >
        but you'll never see your own contributions on the screen.
      </div>
    </div>
  );
};

export default IntroText;
