import React, { useState, useEffect } from "react";
import { css, Global } from "@emotion/core";
import Head from "next/head";

import { getData } from "../fetchers";

import Boxes from "../components/Boxes";
import SelectedBox from "../components/SelectedBox";
import Nav from "../components/NavCons";
import Contribute from "../components/Contribute";
import Overlay from "../components/Overlay";
import Intro from "../components/Intro";
// import Reflect from "../components/Reflect";

import { isBrowser } from "../helpers";
import { getCanvasSize, getNumBoxesPerRow } from "../helpers";

const Landing = ({ reflection, contributions }) => {
  const [boxSize, setBoxSize] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showIntroContent, setShowIntroContent] = useState(false);
  const [isContributeFormActive, setIsContributeFormActive] = useState(false);

  const canvasSize = getCanvasSize();
  const isBoxSelected = selectedIndex !== -1;

  useEffect(() => {
    setBoxSize(window.innerWidth / getNumBoxesPerRow());
  }, []);

  console.warn("boxSize", boxSize);
  console.warn("reflection", reflection);
  console.warn("canvasSize", canvasSize);
  console.warn("isBoxSelected", isBoxSelected);
  console.warn("contributions", contributions);

  return (
    <>
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
          <Head>
            <title>This Website Is Not About You</title>
          </Head>
          <Intro
            setShowIntroContent={setShowIntroContent}
            showIntroContent={showIntroContent}
            isBoxSelected={isBoxSelected}
            setIsContributeFormActive={setIsContributeFormActive}
            reflection={reflection}
            isContributeFormActive={isContributeFormActive}
          />
          <Nav
            boxSize={boxSize}
            showIntroContent={showIntroContent}
            setShowIntroContent={setShowIntroContent}
            setIsContributeFormActive={setIsContributeFormActive}
            isBoxSelected={isBoxSelected}
            isContributeFormActive={isContributeFormActive}
          />
          <Overlay
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            isBoxSelected={isBoxSelected}
            isContributeFormActive={isContributeFormActive}
            setIsContributeFormActive={setIsContributeFormActive}
          />
          {/* <Reflect reflection={reflection} /> */}
          <SelectedBox
            canvasSize={canvasSize}
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
            setShowIntroContent={setShowIntroContent}
            selectedIndex={selectedIndex}
            boxSize={boxSize}
          />
          {isContributeFormActive && (
            <Contribute
              canvasSize={canvasSize}
              reflection={reflection}
              setSelectedIndex={setSelectedIndex}
              setIsContributeFormActive={setIsContributeFormActive}
              isContributeFormActive={isContributeFormActive}
            />
          )}
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  console.warn(">>>>>>>>>>>getServerSideProps");
  const { req, query } = context;
  console.warn("query", query);
  console.warn("query.ego", query.ego);
  const { clientIp, geoIpData } = req;
  const reflection = {
    clientIp,
    geoIpData,
  };

  let contributions = [];

  try {
    contributions = await getData(
      process.env.RESOURCE_URI,
      clientIp,
      query.ego
    );
  } catch (err) {
    console.error(err);
  }

  return { props: { reflection, contributions } };
}

export default Landing;
