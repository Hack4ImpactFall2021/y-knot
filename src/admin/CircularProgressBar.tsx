import React, { useState } from "react";
import "./CircularProgressBar.css";

type WidthUnit = "px" | "vw" | "em" | "rem";

interface Props {
  fillAmount: number,
  width: number,
  widthUnit: WidthUnit
}

// TODO: Clean this up
export const CircularProgressBar: React.FC<Props> = ({ fillAmount, width, widthUnit }) => {
  const [v, setV] = useState(0);
  const unit = widthUnit || "em";//I forget how to do default props
  const circularProgressStyles = {
    width: `${width}${unit}`,
    height: `${width}${unit}`,
  };

  const circleStyle = {
    strokeDasharray: v,
    strokeDashoffset: v
  }
  const fillStyle = {
    strokeDashoffset: `calc(142 - (142 *${fillAmount}) / 100)`
  }
  return (
    <div className="circular-progress" style={circularProgressStyles} onClick={() => { console.log("Here"); setV(v + 1);} }>
      <svg className="progress">
        <circle className="bar" cx="20" cy="20" r={width * 5}></circle>
        <circle className="fill" style={fillStyle} cx="20" cy="20" r={width * 5}></circle>
      </svg>
      <p className="percentage">{fillAmount}%</p>
    </div>
  );
}