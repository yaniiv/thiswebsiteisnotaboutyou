import React from "react";
import { css } from "@emotion/core";

import { isGeoIpDataValid, getLocationString } from "../helpers";

import ClientLocation from "./ClientLocation";
/* 
clientIp: 174.62.76.46
geoIpData: {
  "range":[2923318272,2923319295],
  "country":"US",
  "region":"CA",
  "eu":"0",
  "timezone":"America/Los_Angeles",
  "city":"San Francisco",
  "ll":[37.7703,-122.4407],
  "metro":807,"area":5}
*/

const Hello = ({ reflection }) => {
  const { clientIp, geoIpData } = reflection;
  const geoIpValid = isGeoIpDataValid(geoIpData);

  return (
    <div
      css={css`
        position: fixed;
        top: 15%;
        padding: 10px;
        border: 2px solid #036cdb;
        background: white;
        font-size: 16px;

        @media (min-width: 768px) {
          font-size: 24px;
        }
      `}
    >
      <div>
        Hello{" "}
        <span
          css={css`
            color: blueviolet;
            text-decoration: underline;
          `}
        >
          {clientIp}
        </span>
        {geoIpValid && <ClientLocation geoIpData={geoIpData} />}
      </div>
    </div>
  );
};

export default Hello;
