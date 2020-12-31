import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.scss";

const NavigationItem = (props) => (
  <li className={classes.NavigationItem}>
    {/* NavLink adds its own active class at runtime but since we are using CSS modules here our active class defined in CSS wont be recognized since our classnames
    are hashed to a unique value. To solve this we can used NavLinks activeClassName attribute to specify our own active class and hence apply that CSS */}
    {/* without exact attribute our path will match for all links and so active class will be applied to all tabs as we click */}
    <NavLink exact to={props.link} activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
