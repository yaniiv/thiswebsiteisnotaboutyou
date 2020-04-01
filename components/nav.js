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
  <nav>
    <div
      onClick={() => {
        setShowBodyContent(false);
      }}
      css={css`
        top: 0;
        left: 0;
        position: fixed;

        width: ${boxSize}px;
      `}
    >
      <Icon css={getIconStyles(boxSize)} name="close" />
    </div>
    <div
      css={css`
        top: 0;
        right: 0;
        position: fixed;

        width: ${boxSize}px;
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
