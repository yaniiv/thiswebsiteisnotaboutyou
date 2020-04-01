import React from "react";
import Link from "next/link";
import Head from "next/head";
import chroma from "chroma-js";
import styled from "@emotion/styled";
import { css, jsx, Global, keyframes } from "@emotion/core";

import Icon from "../components/Icon";

import { bodyContent } from "../cms-content";

const links = [
  { href: "https://zeit.co/now", label: "ZEIT" },
  { href: "https://github.com/zeit/next.js", label: "GitHub" }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

function getIconStyles(boxSize) {
  return css`
    /* stroke: white; */
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
    svg {
      height: ${boxSize - 10}px;
      width: ${boxSize - 10}px;
    }
  `;
}

const Nav = ({ setShowBodyContent, boxSize }) => (
  <nav>
    <div
      onClick={() => {
        setShowBodyContent(false);
      }}
      css={css`
        top: 0;
        left: 0;
        position: fixed;
        height: ${boxSize}px;
        width: ${boxSize}px;
        background: white;
        padding: 10px;
        :hover {
          cursor: pointer;
        }
      `}
    >
      <Icon stroke="red" css={getIconStyles(boxSize)} name="close" />
    </div>
    <div
      css={css`
        top: 0;
        right: 0;
        padding: 10px;
        position: fixed;
        width: ${boxSize}px;
        height: ${boxSize}px;
        background: white;
        :hover {
          cursor: pointer;
        }
      `}
      onClick={() => {
        setShowBodyContent(true);
      }}
    >
      <Icon stroke="red" css={getIconStyles(boxSize)} name="info" />
    </div>
  </nav>
);

export default Nav;
