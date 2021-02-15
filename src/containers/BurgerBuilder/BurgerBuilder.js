import React, { useEffect, useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/";
import { connect } from "react-redux";
import axios from "../../axios-orders";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const canBurgerBePurchased = (ingredients) => {
    const totalIngredients = Object.keys(ingredients)
      .map((currentIngredient) => ingredients[currentIngredient])
      .reduce((sum, currentIngredientCount) => sum + currentIngredientCount, 0);
    return totalIngredients > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = async () => {
    props.onInitPurchase();
    props.history.push("/checkout"); //switch to new page
  };

  const disabledStatusInfo = {
    ...props.ings,
  };
  for (const ingredient in disabledStatusInfo) {
    disabledStatusInfo[ingredient] = disabledStatusInfo[ingredient] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? "Cant load ingredients" : <Spinner />;

  if (props.ings) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ings} />
        <BuildControls
          ordered={purchaseHandler}
          canBePurchased={canBurgerBePurchased(props.ings)}
          totalPrice={props.price}
          disabled={disabledStatusInfo}
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          isAuth={props.isAuthenticated}
        />
      </React.Fragment>
    );
    orderSummary = (
      <OrderSummary
        totalPrice={props.price}
        ingredients={props.ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
