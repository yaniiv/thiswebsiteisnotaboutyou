import React, { useState } from "react";
import Head from "next/head";
import chroma from "chroma-js";
import styled from "@emotion/styled";
import { css, jsx, Global, keyframes } from "@emotion/core";

import Nav from "../components/nav";
import Icon from "../components/Icon";

import { bodyContent } from "../cms-content";

const isBrowser = typeof window !== "undefined";

const colors = chroma
  .scale(["#fafa6e", "#2A4858"])
  .mode("lch")
  .colors(200);

console.warn("chroma.random()", chroma.random().hex());

const buttons = colors.map(color => {
  const Button = styled.button`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    color: black;
    font-weight: bold;
    &:hover {
      color: white;
    }
  `;

  return Button;
});

const basicStyles = css`
  background-color: white;
  color: cornflowerblue;
  border: 1px solid lightgreen;
  border-right: none;
  border-bottom: none;
  box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
  transition: all 0.1s linear;
  margin: 3rem 0;
  padding: 1rem 0.5rem;
`;
const hoverStyles = css`
  &:hover {
    color: white;
    background-color: lightgray;
    border-color: aqua;
    box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
  }
`;
const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`;

const Basic = styled.div`
  ${basicStyles};
`;

const Combined = styled.div`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
`;
const Animated = styled.div`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
  animation: ${props => props.animation} 0.2s infinite ease-in-out alternate;
`;

function getBoxDimensions() {
  let width = 50;

  if (typeof window !== "undefined") {
    width = window.innerWidth / 15;
  }
  console.warn(`width`, width);
  return width;
}

function getIconStyles() {
  const width = getBoxDimensions();

  return css`
    vertical-align: middle;
    stroke-width: 2;
    svg {
      height: ${width}px;
      width: ${width}px;
    }

    stroke: white;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;

    /* @media (min-width: 768px) {
      stroke-width: 2;
      height: 60px;
      width: 60px;
    } */
  `;
}

console.warn("HI from index.js");
// console.warn("colors", colors);

const Landing = ({ data, parsedIp, geoIpData }) => {
  const [showBodyContent, setShowBodyContent] = useState(true);
  console.warn("RENDER __ _> parsedIp", parsedIp);
  console.warn("RENDER ___> geoIpData", geoIpData);
  return (
    <React.Fragment>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            background: grey;
            min-height: 100%;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 24px;
          }
        `}
      />
      <div
        css={css`
          position: fixed;
          display: flex;
          color: white;
          flex-direction: column;
          left: 0;
          bottom: 0;
          width: 200px;
        `}
      >
        <div>parsedIp: {parsedIp}</div>
        <div>geoIpData: {geoIpData}</div>
      </div>
      <div
        onClick={() => {
          setShowBodyContent(false);
        }}
        css={css`
          position: fixed;

          left: 0;
          top: 0;
          width: ${getBoxDimensions()}px;
          :hover {
            cursor: pointer;
          }
        `}
      >
        <Icon css={getIconStyles()} name="close" />
      </div>
      <div
        css={css`
          position: fixed;
          right: 0;
          top: 0;
          width: ${getBoxDimensions()}px;
          :hover {
            cursor: pointer;
          }
        `}
        onClick={() => {
          setShowBodyContent(true);
        }}
      >
        <Icon css={getIconStyles()} name="info" />
      </div>
      <div
        css={css`
          display: flex;
          height: 100%;
          width: 100%;
          flex-wrap: wrap;
        `}
      >
        <Head>
          <title>This Website is not about You</title>
        </Head>
        <div
          css={css`
            @keyframes fade-in {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes fade-out {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }

            animation-duration: 4s;
            animation-delay: 2s;
            animation-fill-mode: forwards;
            animation-name: fade-in;

            ${!showBodyContent &&
              css`
                animation-duration: 1s;
                animation-fill-mode: forwards;
                animation-name: fade-out;
              `}
          `}
        >
          <div
            css={css`
              position: fixed;
              top: 200px;
              background: white;
            `}
          >
            Hello,
            <span
              css={css`
                color: blueviolet;
                text-decoration: underline;
              `}
            >
              {" "}
              {parsedIp || "11.111.111.111"}{" "}
            </span>
            , welcome!
          </div>
          {bodyContent.map(section => (
            <div
              css={css`
                position: fixed;
                background: white;
                top: ${section.top};
                left: ${section.left};
                width: ${section.width};
              `}
            >
              {section.text}
            </div>
          ))}
        </div>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
          `}
        >
          {isBrowser() &&
            colors.map((color, index) => {
              let width = getBoxDimensions();
              return (
                <div
                  key={index}
                  css={css`
                    /* margin: 10px; */
                    height: ${width}px;
                    width: ${width}px;
                    background-color: ${chroma.random().hex()};
                    font-size: 24px;
                    /* border-radius: 4px; */
                  `}
                />
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  const { req, res } = context;
  let geoIpData = null;
  let parsedIp = null;
  // console.warn("req", req);
  // console.log("req.parsedIp", req.parsedIp);

  if (req.geoIpData) {
    geoIpData = req.geoIpData;
  }
  if (req.parsedIp) {
    parsedIp = req.parsedIp;
  }
  // geolocationParser(req, res);
  // console.warn("context", context);
  // Fetch data from external API
  // console.warn("req", req);
  // console.warn("res", res);
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();
  const data = "hi";
  console.warn("serverside boiii");
  // Pass data to the page via props
  return { props: { data, parsedIp, geoIpData } };
}

export default Landing;
