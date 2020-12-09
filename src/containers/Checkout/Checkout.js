import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  state = {
    ingredients: {
      salad: 1,
      meat: 1, 
      cheese: 1,
      bacon: 1
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search); //get search params
    const ingredients = {};
    //this ish ow you loop through query parameter entries
    for (let param of query.entries()) {
      //we want it in the form: ['bacon','2']
      ingredients[param[0]] = +param[1]; //+ converts the string to number. Here we want '2' to become 2
    }
    this.setState({ ingredients: ingredients });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
  
    return (
      <div>
        <CheckoutSummary checkoutCancelled={ this.checkoutCancelledHandler } checkoutContinued={this.checkoutContinuedHandler } ingredients={this.state.ingredients} />
        <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
      </div>
    );
  }
}

export default Checkout;