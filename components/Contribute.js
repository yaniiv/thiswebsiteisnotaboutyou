import React, { useState } from "react";
import { css } from "@emotion/core";
import CanvasDraw from "react-canvas-draw";
import { useForm } from "react-hook-form";
import { SketchPicker } from "react-color";
import Icon from "./Icon";

const Contribute = ({ setIsContributeFormActive }) => {
  console.warn("contribute form");
  const canvasProps = {
    onChange: null,
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushRadius: 12,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 400,
    canvasHeight: 400,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false,
  };

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log("Form Submit:", data);
  };
  console.log(errors);
  const [selectedColor, setSelectedColor] = useState("grey");
  return (
    <div
      css={css`
        background: ${selectedColor};
        border: 2px solid #036cdb;
        height: 600px;
        width: 600px;
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 40;
        align-items: center;
        justify-content: center;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        flex-direction: column;
      `}
    >
      <div
        onClick={() => {
          setIsContributeFormActive(false);
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
        <Icon
          css={css`
            cursor: pointer;
            fill: none;
            float: right;
            top: 0;
            right: 0;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 2;
            height: 60px;
            width: 60px;
          `}
          name="close"
        />
      </div>
      <SketchPicker
        color={selectedColor}
        onChangeComplete={(sketchColor) => {
          console.warn("sketchColor", sketchColor);
          setSelectedColor(sketchColor.hex);
        }}
      />

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            name="something to share:"
            ref={register({ max: 500, maxLength: 500 })}
          />
          <input type="submit" />
        </form>
      </div>
      <CanvasDraw {...canvasProps} />
    </div>
  );
};

export default Contribute;
