import React, { useState, useRef } from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";
// import { useForm } from "react-hook-form";
import { SketchPicker, HuePicker, CompactPicker } from "react-color";
import Icon from "./Icon";
import { postData } from "../fetchers";
import { isGeoIpDataValid, getLocationString } from "../helpers";
import moment from "moment";

const Contribute = ({ setIsContributeFormActive, reflection, canvasSize }) => {
  const [backgroundColor, setBackgroundColor] = useState("grey");
  const canvasElement = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreColors, setShowMoreColors] = useState(false);

  const { clientIp, geoIpData } = reflection;
  const geoIpValid = isGeoIpDataValid(geoIpData);
  // const { register, handleSubmit, errors } = useForm();
  const onSubmit = async () => {
    setIsLoading(true);
    console.warn("onSubmit drawingData", drawingData);

    const drawingData = canvasElement.current.getSaveData();
    console.warn("drawingData", drawingData);

    const payload = {
      ip: clientIp,
      canvas: drawingData,
      color: backgroundColor,
      ...(geoIpValid && { locationString: getLocationString(geoIpData) }),
    };

    try {
      const resourceUri = process.env.RESOURCE_URI;

      await postData(resourceUri, payload);

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
        box-sizing: border-box;
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
            &:hover {
              background-color: white;
            }
          `}
          name="close"
          stroke="red"
        />
      </div>
      <div
        css={css`
          position: relative;
        `}
      >
        <div
          css={css`
            position: absolute;
            top: 0;
            transform: translate(-2px, calc(-100% - 4px));
            border: 2px solid #036cdb;
            width: ${canvasSize}px;
            display: flex;
            justify-content: space-between;
            background-color: white;
            box-sizing: border-box;
          `}
        >
          <CompactPicker
            css={css`
              width: 100% !important;
              border-radius: 0 !important;
              &:hover {
                cursor: pointer;
              }

              .flexbox-fix {
                display: none !important;
              }
            `}
            color={backgroundColor}
            onChangeComplete={(sketchColor) => {
              setBackgroundColor(sketchColor.hex);
            }}
          />
          <div
            onClick={() => setShowMoreColors((prevState) => !prevState)}
            css={css`
              font-size: 20px;
              padding: 0 4px;
              box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 10px,
                rgba(0, 0, 0, 0.16) 0px 2px 5px;
              border-radius: 2px;
              background: rgb(255, 255, 255);
              cursor: pointer;
            `}
          >
            ...more
          </div>
        </div>
        {showMoreColors && (
          <SketchPicker
            css={css`
              border: 2px solid #036cdb;
              background-color: "white";
              border-radius: 0 !important;
              box-sizing: border-box;
              position: absolute;
              right: 0;
              transform: translate(calc(100% + 20px), 80px);
              &:hover {
                cursor: pointer;
              }
            `}
            color={backgroundColor}
            onChangeComplete={(sketchColor) => {
              setBackgroundColor(sketchColor.hex);
            }}
          />
        )}
        <CanvasDraw
          ref={canvasElement}
          canvasWidth={canvasSize}
          canvasHeight={canvasSize}
          style={{ background: "transparent" }}
          loadTimeOffset={5}
          lazyRadius={0}
          brushRadius={3}
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
        <div
          onClick={() => {
            setSelectedIndex(-1);
          }}
          css={css`
            :hover {
              cursor: pointer;
              svg {
                stroke: red;
              }
            }
          `}
        >
          <div
            css={css`
              position: absolute;
              bottom: 0;
              left: 0;
              font-size: 14px;
              @media (min-width: 768) {
                font-size: 18px;
              }
              transform: translate(0%, calc(100% + 2px));
            `}
          >
            Contributing on {moment().format("MMMM Do YYYY, [at] h:mm a")}
            {isGeoIpDataValid && `${getLocationString(geoIpData)}`}
          </div>
        </div>
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
