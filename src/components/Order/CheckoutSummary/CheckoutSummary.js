import React from 'react';
import Burger from '../../Burger/Burger';
import classes from "./CheckoutSummary.module.scss";
import Button from "../../UI/Button/Button";

const CheckoutSummary = (props) => {

  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope you like it!</h1>
      <div className={classes.burgerDiv}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked btnType="Danger">CANCEL</Button>
      <Button clicked btnType="Success">CONTINUE</Button>
    </div>
  );
}

export default CheckoutSummary;