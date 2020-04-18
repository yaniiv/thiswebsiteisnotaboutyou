import React, { useState, useEffect } from "react";
import Head from "next/head";
import chroma from "chroma-js";
import { css, Global } from "@emotion/core";
import fetch from "node-fetch";

import Boxes from "../components/Boxes";
import SelectedBox from "../components/SelectedBox";
import Nav from "../components/NavCons";
import Contribute from "../components/Contribute";
import Overlay from "../components/Overlay";
import Intro from "../components/Intro";

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

  useEffect(() => {
    setBoxSize(window.innerWidth / 11);
  }, []);

  console.warn("showBodyContent", showBodyContent);
  console.warn("selectedIndex", selectedIndex);
  console.warn("boxSize", boxSize);

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
            <Overlay
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              isBoxSelected={isBoxSelected}
              isContributeFormActive={isContributeFormActive}
              setIsContributeFormActive={setIsContributeFormActive}
            />
            <Nav
              boxSize={boxSize}
              showBodyContent={showBodyContent}
              setShowBodyContent={setShowBodyContent}
              setIsContributeFormActive={setIsContributeFormActive}
              isBoxSelected={isBoxSelected}
            />
            <Intro
              showBodyContent={showBodyContent}
              isBoxSelected={isBoxSelected}
              setIsContributeFormActive={setIsContributeFormActive}
              parsedIp={parsedIp}
            />
            <SelectedBox
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              boxSize={boxSize}
              contributions={contributions}
              isBoxSelected={isBoxSelected}
            />
            <Boxes
              contributions={contributions}
              isBoxSelected={isBoxSelected}
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
  console.warn("url", url);
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.warn("getData response", response);
  console.warn("getData response.body", response.body);

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
  console.warn(" process.env", process.env);
  console.warn("process.env.BASE_URL", process.env.BASE_URL);
  const resourceUri = process.env.RESOURCE_URI;
  console.warn("resourceUri", resourceUri);
  let contributions = [];
  try {
    contributions = await getData(resourceUri);
    console.warn("getServerSideProps GET DATA SUCCESS -> response", response);
  } catch (err) {
    console.warn("getServerSideProps GET DATA ERROR -> err", err);

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
