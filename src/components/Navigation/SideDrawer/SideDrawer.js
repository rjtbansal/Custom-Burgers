import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {

  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={`${classes.SideDrawer} ${props.open ? classes.Open : classes.Close}`}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
