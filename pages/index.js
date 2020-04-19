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
import Reflect from "../components/Reflect";

import { isBrowser } from "../helpers";
import { getCanvasSize } from "../helpers";

const Landing = ({ reflection, contributions }) => {
  const [boxSize, setBoxSize] = useState(50);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showIntroContent, setShowIntroContent] = useState(true);
  const [isContributeFormActive, setIsContributeFormActive] = useState(false);

  const canvasSize = getCanvasSize();
  const isBoxSelected = selectedIndex !== -1;

  useEffect(() => {
    setBoxSize(window.innerWidth / 11);
  }, []);

  console.warn("boxSize", boxSize);
  console.warn("reflection", reflection);
  console.warn("canvasSize", canvasSize);

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
            showIntroContent={showIntroContent}
            isBoxSelected={isBoxSelected}
            setIsContributeFormActive={setIsContributeFormActive}
            reflection={reflection}
          />
          <Nav
            boxSize={boxSize}
            showIntroContent={showIntroContent}
            setShowIntroContent={setShowIntroContent}
            setIsContributeFormActive={setIsContributeFormActive}
            isBoxSelected={isBoxSelected}
          />
          <Overlay
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
            isBoxSelected={isBoxSelected}
            isContributeFormActive={isContributeFormActive}
            setIsContributeFormActive={setIsContributeFormActive}
          />
          <Reflect reflection={reflection} />
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
              clientIp={reflection.clientIp}
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
  const { req } = context;
  const { clientIp, geoIpData } = req;

  const reflection = {
    clientIp,
    geoIpData,
  };

  let contributions = [];

  try {
    contributions = await getData(process.env.RESOURCE_URI);

    // console.warn(
    //   "getServerSideProps | GET CONTRIBUTIONS SUCCESS -> contributions",
    //   contributions
    // );
  } catch (err) {
    console.warn("getServerSideProps | GET CONTRIBUTIONS ERROR -> err", err);

    console.error(err);
  }

  return { props: { reflection, contributions } };
}

export default Landing;
