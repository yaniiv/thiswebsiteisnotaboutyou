import React from "react";
import { css } from "@emotion/core";

import { getLocationString } from "../helpers";

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

const ClientLocation = ({ geoIpData }) => {
  return (
    <span>
      , from{" "}
      <span
        css={css`
          font-weight: 600;
        `}
      >
        {getLocationString(geoIpData)}
      </span>
    </span>
  );
};

export default ClientLocation;
