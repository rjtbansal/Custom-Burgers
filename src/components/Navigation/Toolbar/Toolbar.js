import React from "react";
import Logo from "../../Logo/Logo";
import classes from "./Toolbar.module.scss";

const Toolbar = props => (

  <header className={classes.Toolbar}>
    <div>
      MENU
    </div>
    <Logo />
    <nav>
      ...
    </nav>
  </header>
);

export default Toolbar;