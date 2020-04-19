import React, { useState, useRef } from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";
// import { useForm } from "react-hook-form";
import { SketchPicker, HuePicker, CompactPicker } from "react-color";
import Icon from "./Icon";
import { postData } from "../fetchers";
import { isGeoIpDataValid, getLocationString } from "../helpers";
import moment from "moment";

const Contribute = ({
  setIsContributeFormActive,
  reflection,
  canvasSize,
  setSelectedIndex,
}) => {
  const [backgroundColor, setBackgroundColor] = useState("grey");
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreColors, setShowMoreColors] = useState(false);

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
    console.warn(
      "canvasElement.current.canvas.toDataURL('image/png')",
      canvasElement.current.canvas.toDataURL("image/png")
    );
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
            float: right;
            top: 0;
            right: 0;
            background-color: transparent;
            position: relative;
            stroke-width: 2;
            z-index: 900;

            height: 36px;
            width: 36px;
            transform: translate(calc(50%), -50%);

            @media (min-width: 768px) {
              transform: translate(calc(100% + 12px), 0%);

              height: 60px;
              width: 60px;
            }

            &:hover {
              background-color: white;
            }
          `}
          name="close"
          stroke="red"
          fill="white"
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
            transform: translate(-2px, calc(-100% - 12px));
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
              box-sizing: border-box !important;
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
        </div>

        {showMoreColors && (
          <SketchPicker
            css={css`
              border: 2px solid #036cdb;
              background-color: "white";
              border-radius: 0 !important;
              box-sizing: border-box;
              position: absolute;
              z-index: 8000;
              right: 0;
              transform: translate(0, 0px);
              left: 0;

              @media (min-width: 768px) {
                transform: translate(calc(100% + 20px), 80px);
              }
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
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
            height: 50px;
            width: 120px;
            border: 2px solid #036cdb;
            transform: translate(0%, calc(100% + 10px));
            font-size: 20px;
            :hover {
              cursor: pointer;
              background-color: lightgray;
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

        <div
          onClick={() => {
            setSelectedIndex(-1);
          }}
          css={css`
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 14px;
            max-width: 200px;

            @media (min-width: 768px) {
              max-width: 320px;
            }
            @media (min-width: 1024px) {
              max-width: 480px;
            }

            transform: translate(0%, calc(100% + 10px));
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
            <span css={css``}>
              {isGeoIpDataValid && `${getLocationString(geoIpData)}`}
            </span>
          </div>

          {/* <form>
            <div>
              <input
                onChange={() => setShareAddress((prevState) => !prevState)}
                type="checkbox"
                id="shareAddress"
                name="subscribe"
                checked={shareAddress}
                defaultChecked
              />
              <label
                css={css`
                  font-size: 14px;
                `}
                for="shareAddress"
              >
                include location
              </label>
            </div>
          </form> */}
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
