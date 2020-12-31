import React from "react";
import classes from "./Order.module.scss";

const Order = (props) => {
  const { price, ingredients } = props;
  const mappedIngredients = [];

  for (let ingredientName in ingredients) {
    mappedIngredients.push(
      <span className={classes.ingredients} key={ingredientName}>
        {ingredientName} - ({ingredients[ingredientName]})
      </span>
    );
  }

  return (
    <div className={classes.Order}>
      <p>
        Ingredients
        {mappedIngredients}
      </p>
      <p>
        Price: <strong>$ {Number.parseFloat(price).toFixed(2)} </strong>
      </p>
    </div>
  );
};

export default Order;
