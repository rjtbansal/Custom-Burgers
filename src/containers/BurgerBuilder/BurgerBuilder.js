import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
}
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4
  };

  addIngredientHandler = type => {

    const currentIngredientCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = currentIngredientCount;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
  }

  removeIngredientHandler = type => {

  }

  render() {
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls ingredientAdded = { this.addIngredientHandler} />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
