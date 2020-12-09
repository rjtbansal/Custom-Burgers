import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.scss';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
          <input className={classes.Input} type="text" name="street" placeholder="Street" />
          <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
          <Button buttonType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;