import React from "react";
import classes from "./Button.module.scss";

const Button = (props) => (
  <button
    className={`${classes.Button} ${classes[props.buttonType]}`}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default Button;
