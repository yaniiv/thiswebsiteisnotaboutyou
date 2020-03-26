import React from "react";
import Head from "next/head";
import chroma from "chroma-js";
import styled from "@emotion/styled";
import { css, jsx, Global, keyframes } from "@emotion/core";

import Nav from "../components/nav";

const colors = chroma
  .scale(["#fafa6e", "#2A4858"])
  .mode("lch")
  .colors(600);

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

console.warn("HI from index.js");
// console.warn("colors", colors);

const Landing = ({ data, parsedIp, geoIpData }) => {
  console.warn("RENDER ___> parsedIp", parsedIp);
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
      <h2
        css={css`
          position: fixed;
          display: flex;
          flex-direction: column;
          top: 0;
          right: 0;
        `}
      >
        <div>parsedIp: {parsedIp}</div>
        <div>geoIpData: {geoIpData}</div>
      </h2>
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
        <div>
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
              {parsedIp || "11.111.111.111"}
            </span>
            , welcome
          </div>
          <div
            css={css`
              position: fixed;
              top: 276px;
              left: 180px;
              background: white;
              width: 400px;
            `}
          >
            This website is about everyone else who's been here except for you
          </div>
          <div
            css={css`
              position: fixed;
              top: 376px;
              left: 380px;
              background: white;
              width: 400px;
            `}
          >
            each box represents a person who's come by and left a note
          </div>
          <div
            css={css`
              position: fixed;
              top: 476px;
              left: 280px;
              background: white;
              width: 400px;
            `}
          >
            every reload page brings up a random sample of 100 notes
          </div>
          <div
            css={css`
              position: fixed;
              top: 576px;
              left: 520px;
              background: white;
              width: 400px;
            `}
          >
            it would be wonderful if you <a hrof="">contributed to the wall</a>{" "}
            and helped to create something with the other people that have been
            here
          </div>
          <div
            css={css`
              position: fixed;
              top: 740px;
              left: 600px;
              background: white;
              width: 400px;
            `}
          >
            but you'll never see your own contributions on the screen.
          </div>
        </div>
        {colors.map((color, index) => {
          return (
            <div
              key={index}
              css={css`
                /* margin: 10px; */
                height: 50px;
                width: 50px;
                margin: 2px;
                background-color: ${chroma.random().hex()};
                font-size: 24px;
                border-radius: 4px;
                &:hover {
                  color: ${color};
                }
              `}
            />
          );
        })}
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
