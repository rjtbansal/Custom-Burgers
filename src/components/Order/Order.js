import React from "react";
import classes from "./Order.module.scss";

const Order = (props) => (
  <div className={classes.Order}>
    <p>Ingredients: Salad (1)</p>
    <p>
      Price: <strong>$10</strong>
    </p>
  </div>
);

export default Order;
