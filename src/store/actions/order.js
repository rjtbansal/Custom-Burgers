import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return async (dispatch) => {
    dispatch(purchaseBurgerStart());
    try {
      const response = await axios.post(
        `/orders.json?auth=${token}`,
        orderData
      ); //.json is firebase specific
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    } catch (error) {
      dispatch(purchaseBurgerFail(error));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

//thunk
export const fetchOrders = (token, userId) => {
  return async (dispatch) => {
    dispatch(fetchOrdersStart());
    try {
      const queryParams = `auth=${token}&orderBy="userId"&equalTo="${userId}"`;
      const res = await axios.get(`/orders.json?${queryParams}`);
      const fetchedOrders = [];
      //we are getting data as object and not array from firebase where key is unique id so we need to parse through it and save it in fetchedOrders as an object {id: , ...otherData}
      for (let key in res.data) {
        fetchedOrders.push({ ...res.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
      dispatch(fetchOrdersFail(error));
    }
  };
};
