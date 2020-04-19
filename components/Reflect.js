import React, { useEffect } from "react";
import { css } from "@emotion/core";

const Reflect = ({ reflection: { geoIpData, clientIp } }) => {
  console.warn("geoIpData", geoIpData);
  console.warn("clientIp", clientIp);
  return (
    <div
      css={css`
        position: fixed;
        color: black;
        display: flex;
        flex-direction: column;
        left: 0;
        bottom: 0;
        background-color: white;
        font-size: 16px;
      `}
    >
      <div>clientIp: {clientIp}</div>
      <div>geoIpData: {JSON.stringify(geoIpData)}</div>
    </div>
  );
};
export default Reflect;
