import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

//adding action creators

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  //thunk middleware is letting us do async request below in the manner
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://mycustomburger.firebaseio.com/ingredients.json"
      );
      dispatch(setIngredients(response.data));
    } catch (error) {
      dispatch(fetchIngredientsFailed());
    }
  };
};
