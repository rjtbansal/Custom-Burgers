import React from "react";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.scss";

const Layout = (props) => (
  <React.Fragment>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}>{props.children}</main>
  </React.Fragment>
);

export default Layout;
