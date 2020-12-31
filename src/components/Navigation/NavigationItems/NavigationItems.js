import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.scss";

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    {/* for boolean prop we can just pass the name. Below we pass active */}
    <NavigationItem link="/" active>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/"> Checkout</NavigationItem>
  </ul>
);

export default NavigationItems;
