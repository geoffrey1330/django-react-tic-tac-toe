import React from "react";

export const Box = (props) => {
  return (
    <button
      className={props.darkMode ? "board__box board__box-dark" : "board__box"}
      onClick={props.onClick}
      disabled={props.buttonDisabled}
    >
      {props.value}
    </button>
  );
};
