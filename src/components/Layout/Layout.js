import React, { useState } from "react";
import { connect } from "react-redux";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.scss";

const Layout = (props) => {

  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

    return (
      <React.Fragment>
        <Toolbar
          isAuth={props.isAuthenticated}
          drawerToggleClicked={sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={props.isAuthenticated}
          closed={sideDrawerClosedHandler}
          open={showSideDrawer}
        />
        <main className={classes.Content}>{props.children}</main>
      </React.Fragment>
    );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
