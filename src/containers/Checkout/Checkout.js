import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search); //get search params
    const ingredients = {};
    let price = 0;
    //this is how you loop through query parameter entries
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        //we want it in the form: ['bacon','2']
        ingredients[param[0]] = +param[1]; //+ converts the string to number. Here we want '2' to become 2
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
        {/* nested route */}
        {/* to include history object below we are passing props through render */}
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
