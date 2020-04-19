import React, { useState, useRef } from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";
// import { useForm } from "react-hook-form";
import { SketchPicker, HuePicker, CompactPicker } from "react-color";
import Icon from "./Icon";
import { postData } from "../fetchers";
import { isGeoIpDataValid, getLocationString, isDesktop } from "../helpers";
import moment from "moment";
import ClientLocation from "./ClientLocation";
import CloseIcon from "./CloseIcon";

const getMockString = () => {
  if (process.env.NODE_ENV !== "production") return "San Francisco CA, US";
};

const SubmitButton = ({ onSubmit, isLoading }) => (
  <button
    onClick={onSubmit}
    disabled={isLoading}
    css={css`
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      border: 2px solid #036cdb;
      font-size: 16px;
      height: 50px;
      width: 100px;

      @media (min-width: 768px) {
        font-size: 20px;
        height: 50px;
        width: 120px;
      }

      :hover {
        cursor: pointer;
        background-color: white;
      }
    `}
  >
    submit
    <Icon
      css={css`
        height: 22px;
        width: 22px;
        padding-left: 4px;
        top: 0;
      `}
      name="save"
      stroke="black"
    />
  </button>
);

const ColorPickers = ({
  canvasSize,
  backgroundColor,
  setShowMoreColors,
  showMoreColors,
  setBackgroundColor,
}) => (
  <div
    css={css`
      position: absolute;
      top: 0;
      border: 2px solid #036cdb;
      width: ${canvasSize}px;
      display: flex;
      justify-content: space-between;
      background-color: white;
      box-sizing: border-box;

      transform: translate(-2px, calc(-100% - 6px));
      @media (min-width: 768px) {
        transform: translate(-2px, calc(-100% - 12px));
      }
    `}
  >
    <CompactPicker
      css={css`
        width: 100% !important;
        border-radius: 0 !important;
        box-sizing: border-box !important;
        &:hover {
          cursor: pointer;
        }

        .flexbox-fix {
          display: none !important;
        }
      `}
      color={backgroundColor}
      onChange={(sketchColor) => {
        setBackgroundColor(sketchColor.hex);
      }}
    />
    {isDesktop() && (
      <div
        onClick={() => setShowMoreColors((prevState) => !prevState)}
        css={css`
          font-size: 14px;
          padding: 4px;
          border-left: 2px solid #036cdb;
          display: flex;
          text-align: center;
          align-items: center;
          background: rgb(255, 255, 255);
          cursor: pointer;

          :hover {
            background-color: lightgray;
          }
        `}
      >
        ...more colors
      </div>
    )}
    {showMoreColors && (
      <SketchPicker
        css={css`
          border: 2px solid #036cdb;
          background-color: "white";
          border-radius: 0 !important;
          box-sizing: border-box;
          position: absolute;
          z-index: 8000;
          transform: translate(0, 0px);
          left: 0;

          @media (min-width: 768px) {
            left: unset;
            right: 0;
            transform: translate(calc(100% + 12px), 132px);
          }
          &:hover {
            cursor: pointer;
          }
        `}
        color={backgroundColor}
        onChange={(sketchColor) => {
          setBackgroundColor(sketchColor.hex);
        }}
      />
    )}
  </div>
);

const TimeAndLocation = ({
  setSelectedIndex,
  geoIpValid,
  shareAddress,
  geoIpData,
  canvasSize,
  setShareAddress,
}) => (
  <div
    onClick={() => {
      setSelectedIndex(-1);
    }}
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 12px;

      max-width: ${canvasSize};

      @media (min-width: 768px) {
        font-size: 14px;
      }

      :hover {
        cursor: pointer;
        svg {
          stroke: red;
        }
      }
    `}
  >
    <div css={css``}>
      Contributing on{" "}
      <span
        css={css`
          font-weight: 600;
        `}
      >
        {moment().format("MMMM Do YYYY, [at] h:mm a")}
      </span>
      {geoIpValid && <ClientLocation geoIpData={geoIpData} />}
    </div>

    <form
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <input
        onChange={() => setShareAddress((prevState) => !prevState)}
        type="checkbox"
        id="shareAddress"
        name="subscribe"
        checked={shareAddress}
      />
      <label css={css``} for="shareAddress">
        Include location in contribution
      </label>
    </form>
  </div>
);

const Contribute = ({
  setIsContributeFormActive,
  reflection,
  canvasSize,
  setSelectedIndex,
}) => {
  const [backgroundColor, setBackgroundColor] = useState("grey");
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreColors, setShowMoreColors] = useState(false);
  const [shareAddress, setShareAddress] = useState(true);

  const canvasElement = useRef(null);

  const { clientIp, geoIpData } = reflection;
  const geoIpValid = isGeoIpDataValid(geoIpData);

  const onSubmit = async () => {
    setIsLoading(true);
    console.warn("onSubmit drawingData", drawingData);

    const drawingData = canvasElement.current.getSaveData();
    console.warn("canvasElement", canvasElement);
    console.warn("canvasElement.current", canvasElement.current);
    console.warn("canvasElement.current.canvas", canvasElement.current.canvas);
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
      <CloseIcon
        handleClick={() => {
          setIsContributeFormActive(false);
        }}
      />

      <div
        css={css`
          position: relative;
        `}
      >
        <ColorPickers
          canvasSize={canvasSize}
          backgroundColor={backgroundColor}
          setShowMoreColors={setShowMoreColors}
          showMoreColors={showMoreColors}
          setBackgroundColor={setBackgroundColor}
        />
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

        <div
          css={css`
            bottom: 0;
            right: 0;
            position: absolute;
            display: flex;
            justify-content: space-between;
            width: ${canvasSize}px;
            transform: translate(2px, calc(100% + 2px));

            @media (min-width: 768px) {
              transform: translate(2px, calc(100% + 10px));
            }
          `}
        >
          <TimeAndLocation
            canvasSize={canvasSize}
            setSelectedIndex={setSelectedIndex}
            geoIpValid={geoIpValid}
            geoIpData={geoIpData}
            shareAddress={shareAddress}
            setShareAddress={setShareAddress}
          />
          <SubmitButton isLoading={isLoading} onSubmit={onSubmit} />
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
