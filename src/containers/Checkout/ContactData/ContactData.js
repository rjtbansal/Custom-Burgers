import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.scss";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Rajat B",
        address: {
          street: "Walmer Rd",
          country: "Canada",
        },
        email: "rajat@test.com",
      },
      deliveryMethod: "fastest",
    };
    try {
      await axios.post("/orders.json", order); //.json is firebase specific
      this.setState({ isLoading: false });
      this.props.history.push("/");
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button buttonType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
