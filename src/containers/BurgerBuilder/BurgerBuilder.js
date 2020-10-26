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
    totalPrice: 4,
    canBePurchased: false
  };

  canBurgerBePurchased = (ingredients) => {
    const totalIngredients = Object.keys(ingredients)
      .map(currentIngredient => ingredients[currentIngredient])
      .reduce((sum, currentIngredientCount) => sum + currentIngredientCount, 0);
    this.setState({
      canBePurchased: totalIngredients > 0
    });
  }

  addIngredientHandler = type => {

    const currentIngredientCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = currentIngredientCount;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
    this.canBurgerBePurchased(updatedIngredients);
  }

  removeIngredientHandler = type => {

    const currentIngredientCount = this.state.ingredients[type] - 1;
    console.log(currentIngredientCount);
    if (currentIngredientCount < 0) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = currentIngredientCount;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
    this.canBurgerBePurchased(updatedIngredients);
  }

  render() {

    const disabledStatusInfo = {
      ...this.state.ingredients
    };
    for (const ingredient in disabledStatusInfo) {
      disabledStatusInfo[ingredient] = disabledStatusInfo[ingredient] <= 0;
    }
    console.log(disabledStatusInfo);
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls canBePurchased={this.state.canBePurchased} totalPrice={this.state.totalPrice} disabled={disabledStatusInfo} ingredientAdded = { this.addIngredientHandler} ingredientRemoved = { this.removeIngredientHandler} />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
