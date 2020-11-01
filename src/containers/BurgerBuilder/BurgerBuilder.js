import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    canBePurchased: false,
    purchasing: false,
  };

  canBurgerBePurchased = (ingredients) => {
    const totalIngredients = Object.keys(ingredients)
      .map((currentIngredient) => ingredients[currentIngredient])
      .reduce((sum, currentIngredientCount) => sum + currentIngredientCount, 0);
    this.setState({
      canBePurchased: totalIngredients > 0,
    });
  };

  addIngredientHandler = (type) => {
    const currentIngredientCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = currentIngredientCount;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients,
    });
    this.canBurgerBePurchased(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const currentIngredientCount = this.state.ingredients[type] - 1;
    if (currentIngredientCount < 0) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = currentIngredientCount;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients,
    });
    this.canBurgerBePurchased(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("Continueee...");
  };

  render() {
    const disabledStatusInfo = {
      ...this.state.ingredients,
    };
    for (const ingredient in disabledStatusInfo) {
      disabledStatusInfo[ingredient] = disabledStatusInfo[ingredient] <= 0;
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ordered={this.purchaseHandler}
          canBePurchased={this.state.canBePurchased}
          totalPrice={this.state.totalPrice}
          disabled={disabledStatusInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
