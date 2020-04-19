import React, { useState, useEffect } from "react";
import Head from "next/head";
import chroma from "chroma-js";
import { css, Global } from "@emotion/core";
import { getData } from "../fetchers";
import Boxes from "../components/Boxes";
import SelectedBox from "../components/SelectedBox";
import Nav from "../components/NavCons";
import Contribute from "../components/Contribute";
import Overlay from "../components/Overlay";
import Intro from "../components/Intro";

function isBrowser() {
  return typeof window !== "undefined";
}

const Landing = ({ clientIp, geoIpData, contributions }) => {
  const [boxSize, setBoxSize] = useState(50);
  const [showBodyContent, setShowBodyContent] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isContributeFormActive, setIsContributeFormActive] = useState(false);

  const isBoxSelected = selectedIndex !== -1;

  useEffect(() => {
    setBoxSize(window.innerWidth / 11);
  }, []);

  console.warn("isContributeFormActive", isContributeFormActive);
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
            <div>clientIp: {clientIp}</div>
            <div>geoIpData: {JSON.stringify(geoIpData)}</div>
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
              clientIp={clientIp}
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
                clientIp={clientIp}
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

export async function getServerSideProps(context) {
  const { req } = context;
  const { clientIp, geoIpData } = req;

  console.warn(">>>>>>>>>> getServerSideProps");
  console.warn("geoIpData", geoIpData);
  console.warn("clientIp", clientIp);

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

  return { props: { clientIp, geoIpData, contributions } };
}

export default Landing;
