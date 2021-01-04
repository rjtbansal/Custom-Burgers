import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};
class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    canBePurchased: false,
    purchasing: false,
    isLoading: false,
    error: false,
  };

  async componentDidMount() {
    console.log(this.props);
    // try {
    //   const response = await axios.get(
    //     "https://mycustomburger.firebaseio.com/ingredients.json"
    //   );
    //   this.setState({ ingredients: response.data });
    // } catch (error) {
    //   this.setState({ error: true });
    // }
  }

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

  purchaseContinueHandler = async () => {
    const queryParams = [];
    for (let key in this.state.ingredients) {
      //encodeURIComponent encodes are data to be prepared for use in URL
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(
          this.state.ingredients[key]
        )}`
      );
    }
    queryParams.push(`price=${this.state.totalPrice}`);
    const queryString = queryParams.join("&"); //& needs to be appended between all queryParams so: ?salad=2&bacon=1 and so on
    this.props.history.push({
      pathname: "/checkout",
      search: `?${queryString}`,
    }); //switch to new page
  };

  render() {
    const disabledStatusInfo = {
      ...this.props.ings,
    };
    for (const ingredient in disabledStatusInfo) {
      disabledStatusInfo[ingredient] = disabledStatusInfo[ingredient] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? "Cant load ingredients" : <Spinner />;

    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ordered={this.purchaseHandler}
            canBePurchased={this.state.canBePurchased}
            totalPrice={this.state.totalPrice}
            disabled={disabledStatusInfo}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          totalPrice={this.state.totalPrice}
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.isLoading) {
      orderSummary = <Spinner />;
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
    ings: state.ingredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(mapStateToProps ,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
