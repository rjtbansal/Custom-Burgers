import React from "react";
const OrderSummary = (props) => {

  const ingredientSummary = [];
  for (const ingredient in props.ingredients) {
    ingredientSummary.push(<li key={ingredient}><span style={{textTransform: 'capitalize'}}>{ingredient}</span>:{props.ingredients[ingredient]}</li>);
  }

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p> Yummy burger with the following ingredients: </p>
      <ul>
        { ingredientSummary }
      </ul>
      <p> Continue to Checkout? </p>
    </React.Fragment>
  )
};

export default OrderSummary;

