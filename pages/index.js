import React, { useState, useEffect } from "react";
import Head from "next/head";
import chroma from "chroma-js";
import styled from "@emotion/styled";
import { css, jsx, Global, keyframes } from "@emotion/core";

import Hello from "../components/Hello";
import Boxes from "../components/Boxes";
import SelectedBox from "../components/SelectedBox";
import BodyText from "../components/BodyText";
import Nav from "../components/NavCons";
import Contribute from "../components/Contribute";

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
  animation: ${(props) => props.animation} 0.2s infinite ease-in-out alternate;
`;

function isBrowser() {
  return typeof window !== "undefined";
}

const Landing = ({ data, parsedIp, geoIpData }) => {
  const [showBodyContent, setShowBodyContent] = useState(true);
  const [boxSize, setBoxSize] = useState(50);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [isContributeFormActive, setIsContributeFormActive] = useState(false);
  const isBoxSelected = selectedIndex !== -1;
  const [colors, setColors] = useState([]);

  useEffect(() => {
    console.warn("Landing useEffect");
    setBoxSize(window.innerWidth / 11);
    for (let i = 0; i < 200; i++) {
      colors.push(chroma.random().hex());
    }
    setColors(colors);
  }, []);

  console.warn("showBodyContent", showBodyContent);
  console.warn("selectedIndex", selectedIndex);
  console.warn("boxSize", boxSize);
  console.warn("colors", colors);

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
              <title>This Website Is Not About You</title>
            </Head>

            {showBodyContent && !isBoxSelected && (
              <>
                <Nav
                  boxSize={boxSize}
                  showBodyContent={showBodyContent}
                  setShowBodyContent={setShowBodyContent}
                  setIsContributeFormActive={setIsContributeFormActive}
                  isBoxSelected={isBoxSelected}
                />
                <div>
                  <Hello parsedIp={parsedIp} />
                  <BodyText />
                </div>
              </>
            )}
            <SelectedBox
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              colors={colors}
              boxSize={boxSize}
              isBoxSelected={isBoxSelected}
            />
            <Boxes
              isBoxSelected={isBoxSelected}
              colors={colors}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              boxSize={boxSize}
            />
            {isContributeFormActive && (
              <Contribute
                setIsContributeFormActive={setIsContributeFormActive}
              />
            )}
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
  // console.warn("res", res);
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();
  const data = "hi";
  console.warn("serverside boiii");
  // Pass data to the page via props
  return { props: { data, parsedIp, geoIpData } };
}

export default Landing;
