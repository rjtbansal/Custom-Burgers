import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  }
}

export const purchaseBurgerStart = (orderData) => {

  return async(dispatch) => {
    try {
      const response = await axios.post("/orders.json", orderData); //.json is firebase specific
      dispatch(purchaseBurgerSuccess(response.data, orderData))
     
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};