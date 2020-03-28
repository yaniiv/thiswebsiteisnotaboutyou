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
    position: fixed;
    vertical-align: middle;
    top: 0;
    width: ${boxSize}px;

    :hover {
      cursor: pointer;
    }

    stroke: white;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
    svg {
      height: ${boxSize}px;
      width: ${boxSize}px;
    }
  `;
}

const Nav = ({ setShowBodyContent, boxSize }) => (
  <nav css={css``}>
    <div
      onClick={() => {
        setShowBodyContent(false);
      }}
      css={css`
        left: 0;
      `}
    >
      <Icon css={getIconStyles(boxSize)} name="close" />
    </div>
    <div
      css={css`
        right: 0;
      `}
      onClick={() => {
        setShowBodyContent(true);
      }}
    >
      <Icon css={getIconStyles(boxSize)} name="info" />
    </div>
  </nav>
);

export default Nav;
