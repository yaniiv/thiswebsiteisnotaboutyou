import React, { useState, useRef } from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";
// import { useForm } from "react-hook-form";
import { SketchPicker } from "react-color";
import Icon from "./Icon";
import { postData } from "../fetchers";

const canvasProps = {};

const Contribute = ({ setIsContributeFormActive, clientIp, canvasSize }) => {
  const [backgroundColor, setBackgroundColor] = useState("grey");
  const canvasElement = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // const { register, handleSubmit, errors } = useForm();
  const onSubmit = async () => {
    setIsLoading(true);
    const drawingData = canvasElement.current.getSaveData();
    const payload = {
      ip: clientIp,
      canvas: drawingData,
      color: backgroundColor,
    };

    let response;
    try {
      console.warn("payload", payload);
      const resourceUri = process.env.RESOURCE_URI;

      response = await postData(resourceUri, payload);

      setIsContributeFormActive(false);
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
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
          loadTimeOffset={5}
          lazyRadius={30}
          brushRadius={6}
          brushColor="black"
          // catenaryColor: "#0a0302",
          // gridColor: "rgba(150,150,150,0.17)",
          hideGrid={true}
          disabled={false}
          saveData={null}
          immediateLoading={false}
          hideInterface={false}
        />
        <button
          onClick={onSubmit}
          disabled={isLoading}
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
