import React, { useState, useEffect } from "react";
import Head from "next/head";
import chroma from "chroma-js";
import { css, Global } from "@emotion/core";
import fetch from "node-fetch";

import Hello from "../components/Hello";
import Boxes from "../components/Boxes";
import SelectedBox from "../components/SelectedBox";
import BodyText from "../components/BodyText";
import Nav from "../components/NavCons";
import Contribute from "../components/Contribute";

function isBrowser() {
  return typeof window !== "undefined";
}

const Landing = ({ data, parsedIp, geoIpData, contributions }) => {
  console.warn("contributions", contributions);
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
            {(isBoxSelected || isContributeFormActive) && (
              <div
                onClick={() => {
                  setIsContributeFormActive(false);
                  setSelectedIndex(-1);
                }}
                css={css`
                  height: 100%;
                  width: 100%;
                  position: fixed;
                  z-index: 10;
                  background: white;
                  opacity: 0.75;
                `}
              />
            )}
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
                  <BodyText
                    setIsContributeFormActive={setIsContributeFormActive}
                  />
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
              contributions={contributions}
              isBoxSelected={isBoxSelected}
              colors={colors}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              boxSize={boxSize}
            />
            {isContributeFormActive && (
              <Contribute
                parsedIp={parsedIp}
                setIsContributeFormActive={setIsContributeFormActive}
                isContributeFormActive={isContributeFormActive}
              />
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

// Example POST method implementation:
async function getData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    "Access-Control-Allow-Origin": "*",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

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

  let contributions = null;
  try {
    contributions = await getData("http://localhost:5000/contributions");
    console.warn("GET DATA SUCCESS -> response", response);
  } catch (err) {
    console.warn("GET DATA ERROR -> err", err);

    console.error(err);
  }

  // console.warn("res", res);
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();
  const data = "hi";
  console.warn("serverside boiii");
  // Pass data to the page via props
  return { props: { data, parsedIp, geoIpData, contributions } };
}

export default Landing;
