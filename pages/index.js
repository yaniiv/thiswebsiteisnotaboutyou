import React, { useState } from "react";
import Head from "next/head";
import chroma from "chroma-js";
import styled from "@emotion/styled";
import { css, jsx, Global, keyframes } from "@emotion/core";

import Hello from "../components/Hello";
import Boxes from "../components/Boxes";
import BodyText from "../components/BodyText";
import Nav from "../components/NavCons";

console.warn("chroma.random()", chroma.random().hex());

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

function isBrowser() {
  return typeof window !== "undefined";
}

function getBoxDimensions() {
  let width = 50;

  if (isBrowser()) {
    width = window.innerWidth / 15;
  }
  console.warn(`width`, width);
  return width;
}

console.warn("HI from index.js");
// console.warn("colors", colors);

const Landing = ({ data, parsedIp, geoIpData }) => {
  const [showBodyContent, setShowBodyContent] = useState(true);
  const boxSize = getBoxDimensions();
  console.warn("boxSize", boxSize);
  console.warn("RENDER __ _> parsedIp", parsedIp);
  console.warn("RENDER ___> geoIpData", geoIpData);
  return (
    <React.Fragment>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            background: black;
            min-height: 100%;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 24px;
          }
        `}
      />
      {isBrowser() && (
        <div>
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
          <div>
            <Head>
              <title>This Website is not about You</title>
            </Head>
            <Nav
              boxSize={boxSize}
              showBodyContent={showBodyContent}
              setShowBodyContent={setShowBodyContent}
            />
            <div
              css={css`
                opacity: 1;
                ${!showBodyContent &&
                  css`
                    opacity: 0;
                  `}
              `}
            >
              <Hello parsedIp={parsedIp} />
              <BodyText />
            </div>
            <Boxes boxSize={boxSize} />
          </div>
        </div>
      )}
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
