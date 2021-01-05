import * as actionTypes from "../actions/actionTypes";
import { cloneDeep } from "lodash";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const copyStateForAddIngredient = cloneDeep(state);
      copyStateForAddIngredient.ingredients[action.ingredientName] += 1;
      copyStateForAddIngredient.totalPrice +=
        INGREDIENT_PRICES[action.ingredientName];
      return copyStateForAddIngredient;

    case actionTypes.REMOVE_INGREDIENT:
      const copyStateForRemoveIngredient = cloneDeep(state);
      copyStateForRemoveIngredient.ingredients[action.ingredientName] -= 1;
      copyStateForRemoveIngredient.totalPrice -=
        INGREDIENT_PRICES[action.ingredientName];
      return copyStateForRemoveIngredient;

    default:
      return state;
  }
};

export default reducer;
