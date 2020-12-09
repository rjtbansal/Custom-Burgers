import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    canBePurchased: false,
    purchasing: false,
    isLoading: false,
    error: false
  };

  async componentDidMount() {
    try{
    const response = await axios.get('https://mycustomburger.firebaseio.com/ingredients.json');
      this.setState({ ingredients: response.data });
    }
    catch (error) {
      this.setState({ error: true });
    }
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
    // this.setState({ isLoading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Rajat B",
    //     address: {
    //       street: "Walmer Rd",
    //       country: "Canada"
    //     },
    //     email: "rajat@test.com"
    //   },
    //   deliveryMethod: 'fastest'
    // };
    // try{
    //   await axios.post('/orders.json', order); //.json is firebase specific
    //   this.setState({ isLoading: false, purchasing: false });
    // } catch (error) {
    //   this.setState({ isLoading: false, purchasing: false });
    // }
    const queryParams = [];
    for (let key in this.state.ingredients) {
      //encodeURIComponent encodes are data to be prepared for use in URL
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(this.state.ingredients[key])}`);
    }
    const queryString = queryParams.join('&'); //& needs to be appended between all queryParams so: ?salad=2&bacon=1 and so on
    this.props.history.push({pathname: '/checkout', search: `?${queryString}`}); //switch to new page
  };

  render() {
    const disabledStatusInfo = {
      ...this.state.ingredients,
    };
    for (const ingredient in disabledStatusInfo) {
      disabledStatusInfo[ingredient] = disabledStatusInfo[ingredient] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? "Cant load ingredients" : <Spinner />;

    if(this.state.ingredients) {
        burger = (
          <React.Fragment>
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
      orderSummary = <OrderSummary
              totalPrice={this.state.totalPrice}
              ingredients={this.state.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
            />;
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
          { orderSummary }
        </Modal>
        { burger }
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
