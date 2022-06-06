import React, { useEffect, useState } from "react";

import success from "./assets/success.png";
import error from "./assets/error.png";

import "./Toast.css";

interface Props {
  isError: boolean,
  message: string,
  timeout: number,
  onDelete: VoidFunction
}

const Toast : React.FC<Props>= ({ isError, message, timeout, onDelete }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      onDelete();
    }, timeout);

    return () => { clearInterval(interval); }
  }, []);

  return (
    <div className={"toast" + (isError ? " error" : " success")} style={{ animationDuration: `${timeout/1000}s` }}>
      <img src={isError ? error : success} alt=""/>
      <p>{message}</p>
    </div>
  );
}

export default Toast;