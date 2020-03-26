import React from "react";
import Head from "next/head";
import chroma from "chroma-js";
import styled from "@emotion/styled";
import { css, jsx, Global, keyframes } from "@emotion/core";

import Nav from "../components/nav";

const datum = Array.from(true).fill(10);
const colors = chroma
  .scale(["#fafa6e", "#2A4858"])
  .mode("lch")
  .colors(600);

const buttons = colors.map(color => {
  const Button = styled.button`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    color: black;
    font-weight: bold;
    &:hover {
      color: white;
    }
  `;

  return Button;
});

const basicStyles = css`
  background-color: white;
  color: cornflowerblue;
  border: 1px solid lightgreen;
  border-right: none;
  border-bottom: none;
  box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
  transition: all 0.1s linear;
  margin: 3rem 0;
  padding: 1rem 0.5rem;
`;
const hoverStyles = css`
  &:hover {
    color: white;
    background-color: lightgray;
    border-color: aqua;
    box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
  }
`;
const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`;

const Basic = styled.div`
  ${basicStyles};
`;

const Combined = styled.div`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
`;
const Animated = styled.div`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
  animation: ${props => props.animation} 0.2s infinite ease-in-out alternate;
`;

console.warn("colors", colors);

console.warn("datum", datum);

const Landing = () => (
  <React.Fragment>
    <Global
      styles={css`
        html,
        body {
          margin: 0;
          background: grey;
          min-height: 100%;
          font-family: Helvetica, Arial, sans-serif;
          font-size: 24px;
        }
      `}
    />
    <div
      css={css`
        display: flex;
        height: 100%;
        width: 100%;
        flex-wrap: wrap;
      `}
    >
      <Head>
        <title>With Emotion</title>
      </Head>
      <div>
        <div
          css={css`
            position: fixed;
            top: 200px;
            background: white;
          `}
        >
          This website is not about you
        </div>
        <div
          css={css`
            position: fixed;
            top: 276px;
            left: 180px;
            background: white;

            width: 400px;
          `}
        >
          It's about everyone else who's been here except for you
        </div>
        <div
          css={css`
            position: fixed;
            top: 376px;
            left: 380px;
            background: white;

            width: 400px;
          `}
        >
          each box represents a person who's come here and left their mark: a
          color and a note
        </div>
        <div
          css={css`
            position: fixed;
            top: 476px;
            left: 280px;
            background: white;

            width: 400px;
          `}
        >
          every reload page brings up the most recent set of many submissions as
          will fit on your screen
        </div>

        <div
          css={css`
            position: fixed;
            top: 576px;
            left: 480px;
            background: white;
            width: 400px;
          `}
        >
          it would be wonderful if you <a hrof="">contributed to the wall</a>,
          but you'll never see your own box on the screen.
        </div>
        {/* <div
          css={css`
            position: fixed;
            top: 896px;
            left: 680px;
            background: white;

            width: 400px;
          `}
        >
          this website just isn't about you. It's about everyone else but you.
        </div> */}
        {/* <Basic>Cool Styles</Basic>
        <Combined>
          With <code>:hover</code>.
        </Combined>
        <Animated animation={bounce}>Let's bounce.</Animated> */}
      </div>
      {colors.map((color, index) => {
        return (
          <div
            key={index}
            css={css`
              /* margin: 10px; */
              height: 50px;
              width: 50px;
              margin: 2px;
              background-color: ${color};
              font-size: 24px;
              border-radius: 4px;
              &:hover {
                color: ${color};
              }
            `}
          />
        );
      })}
    </div>
  </React.Fragment>
);

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">Welcome to Next.js!</h1>
      <p className="description">
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>

      <div className="row">
        <a href="https://nextjs.org/docs" className="card">
          <h3>Documentation &rarr;</h3>
          <p>Learn more about Next.js in the documentation.</p>
        </a>
        <a href="https://nextjs.org/learn" className="card">
          <h3>Next.js Learn &rarr;</h3>
          <p>Learn about Next.js by following an interactive tutorial!</p>
        </a>
        <a
          href="https://github.com/zeit/next.js/tree/master/examples"
          className="card"
        >
          <h3>Examples &rarr;</h3>
          <p>Find other example boilerplates on the Next.js GitHub.</p>
        </a>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
);

export default Landing;
