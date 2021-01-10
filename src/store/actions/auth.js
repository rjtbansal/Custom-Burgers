import * as actionTypes from "./actionTypes";
import axios from "axios";

const api_key = process.env.REACT_APP_FIREBASE_API_KEY;
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDateAndTime");
  localStorage.removeItem("userId");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
      /** new Date with an argument converts the calculated date and time */
      const expirationDateAndTime = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationDateAndTime", expirationDateAndTime);
      localStorage.setItem("userId", response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

//handy utility to keep user logged in with a valid token
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDateAndTime = new Date(
        localStorage.getItem("expirationDateAndTime")
      );
      const currentDateAndTime = new Date();
      if (currentDateAndTime > expirationDateAndTime) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        //pass on difference between future date in seconds and current date in seconds
        dispatch(
          checkAuthTimeout(
            (expirationDateAndTime.getTime() - new Date().getTime())/1000
          )
        );
      }
    }
  };
};
