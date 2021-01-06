import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/";
import { connect } from "react-redux";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  canBurgerBePurchased = (ingredients) => {
    const totalIngredients = Object.keys(ingredients)
      .map((currentIngredient) => ingredients[currentIngredient])
      .reduce((sum, currentIngredientCount) => sum + currentIngredientCount, 0);
    return totalIngredients > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = async () => {
    this.props.history.push("/checkout"); //switch to new page
  };

  render() {
    const disabledStatusInfo = {
      ...this.props.ings,
    };
    for (const ingredient in disabledStatusInfo) {
      disabledStatusInfo[ingredient] = disabledStatusInfo[ingredient] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? "Cant load ingredients" : <Spinner />;

    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ordered={this.purchaseHandler}
            canBePurchased={this.canBurgerBePurchased(this.props.ings)}
            totalPrice={this.props.price}
            disabled={disabledStatusInfo}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.price}
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
