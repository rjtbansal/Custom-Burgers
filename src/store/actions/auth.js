import * as actionTypes from "./actionTypes";
import axios from "axios";

const api_key = process.env.REACT_APP_FIREBASE_API_KEY;
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

/**will be an async call to authentication request */
export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`;
    if (!isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`;
    }
    try {
      const response = await axios.post(url, authData);
      dispatch(authSuccess(response.data));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};
