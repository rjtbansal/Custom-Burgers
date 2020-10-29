import React from "react";
import Button from "../UI/Button/Button";
const OrderSummary = (props) => {
  const ingredientSummary = [];
  for (const ingredient in props.ingredients) {
    ingredientSummary.push(
      <li key={ingredient}>
        <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:
        {props.ingredients[ingredient]}
      </li>
    );
  }

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p> Yummy burger with the following ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p> <strong>Total price: {props.totalPrice.toFixed(2)}</strong> </p>
      <p> Continue to Checkout? </p>
      <Button buttonType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button buttonType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </React.Fragment>
  );
};

export default OrderSummary;
