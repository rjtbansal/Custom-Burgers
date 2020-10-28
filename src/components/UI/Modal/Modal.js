import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.scss";

const Modal = (props) => (
  <React.Fragment>
    <Backdrop clicked={props.modalClosed} show={props.show} />
    <div
      className={`${classes.Modal} ${
        props.show ? classes.showModal : classes.hideModal
      } `}
    >
      {props.children}
    </div>
  </React.Fragment>
);

export default Modal;
