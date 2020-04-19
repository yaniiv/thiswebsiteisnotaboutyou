import React from "react";
import { css } from "@emotion/core";

// import { bodyContent } from "../cms-content";

const BodyText = ({ setIsContributeFormActive }) => {
  return (
    <>
      {/* {bodyContent.map((section, index) => (
        <div
          key={index}
          css={css`
            position: fixed;
            background: white;
            padding: 10px;
            border: 1px solid #036cdb;
            top: ${section.top};
            left: ${section.left};
            width: ${section.width};
          `}
        >
          {section.text}
        </div>
      ))} */}
      <div
        css={css`
          position: fixed;
          background: white;
          padding: 10px;
          border: 1px solid #036cdb;
          top: 276px;
          left: 180px;
          width: 400px;
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
          top: 376px;
          left: 380px;
          width: 400px;
        `}
      >
        each note was left by a visitor just like you
      </div>
      <div
        css={css`
          position: fixed;
          background: white;
          padding: 10px;
          border: 1px solid #036cdb;
          top: 476px;
          left: 280px;
          width: 400px;
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
          top: 576px;
          left: 520px;
          width: 400px;
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
          top: 740px;
          left: 740px;
          width: 400px;
        `}
      >
        but you'll never see your own contributions on the screen.
      </div>
    </>
  );
};

export default BodyText;
