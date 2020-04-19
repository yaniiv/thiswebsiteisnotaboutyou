import React, { useState, useRef } from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";
// import { useForm } from "react-hook-form";
import { SketchPicker } from "react-color";
import Icon from "./Icon";

const canvasProps = {
  onChange: null,
  loadTimeOffset: 5,
  lazyRadius: 30,
  brushRadius: 6,
  brushColor: "black",
  // catenaryColor: "#0a0302",
  // gridColor: "rgba(150,150,150,0.17)",
  hideGrid: true,
  canvasWidth: 600,
  canvasHeight: 600,
  disabled: false,
  saveData: null,
  immediateLoading: false,
  hideInterface: false,
};

// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const Contribute = ({ setIsContributeFormActive, parsedIp, canvasSize }) => {
  const [backgroundColor, setBackgroundColor] = useState("grey");
  const canvasElement = useRef(null);

  // const { register, handleSubmit, errors } = useForm();
  const onSubmit = async () => {
    console.warn("ONSUBMIT");
    console.warn("Button Press -> contribute submit");

    const drawingData = canvasElement.current.getSaveData();
    const payload = {
      ip: parsedIp,
      canvas: drawingData,
      color: backgroundColor,
    };

    let response;
    try {
      console.warn("payload", payload);
      const resourceUri = process.env.RESOURCE_URI;

      response = await postData(resourceUri, payload);
      setIsContributeFormActive(false);
      console.warn("POST DATA SUCCESS -> response", response);
    } catch (err) {
      console.warn("POST DATA ERROR -> err", err);

      console.error(err);
    }
  };

  return (
    <div
      css={css`
        background: ${backgroundColor};
        border: 2px solid #036cdb;
        position: fixed;
        z-index: 50;
        flex-direction: column;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: ${canvasSize}px;
        width: ${canvasSize}px;
      `}
    >
      <div
        onClick={() => {
          setIsContributeFormActive(false);
        }}
      >
        <Icon
          css={css`
            border: 2px solid #036cdb;
            cursor: pointer;
            fill: none;
            float: right;
            top: 0;
            right: 0;
            transform: translate(calc(100% + 20px), 0%);
            stroke-width: 2;
            z-index: 50;
            height: 60px;
            width: 60px;
          `}
          name="close"
          fill="white"
          stroke="white"
        />
      </div>
      <div>
        <SketchPicker
          css={css`
            right: 0;
            bottom: 0;
            border: 2px solid #036cdb;
            border-radius: 0 !important;
            position: absolute;
            transform: translate(calc(100% + 20px), 0%);
            &:hover {
              cursor: pointer;
            }
          `}
          color={backgroundColor}
          onChangeComplete={(sketchColor) => {
            setBackgroundColor(sketchColor.hex);
          }}
        />
        <CanvasDraw
          ref={canvasElement}
          {...canvasProps}
          canvasWidth={canvasSize}
          canvasHeight={canvasSize}
          style={{ background: "transparent" }}
        />
        <button
          onClick={onSubmit}
          css={css`
            position: absolute;
            bottom: 0;
            right: 0;
            background: white;
            height: 50px;
            width: 120px;
            border: 2px solid #036cdb;
            transform: translate(0%, calc(100% + 20px));
            font-size: 20px;

            &:hover {
              cursor: pointer;
            }
          `}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default Contribute;

{
  /* <form
          css={css`
            position: absolute;
            bottom: 0;
            right: 0;

            input[type="submit"] {
              height: 90px;
            }
          `}
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            name="something to share:"
            ref={register({ max: 500, maxLength: 500 })}
          />
          <input css={css``} type="submit" />
        </form> */
}
