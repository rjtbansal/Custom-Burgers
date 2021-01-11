import * as actionTypes from "../actions/actionTypes";
import { cloneDeep } from "lodash";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false //building the burger in progress
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
      copyStateForAddIngredient.building=true;
      return copyStateForAddIngredient;

    case actionTypes.REMOVE_INGREDIENT:
      const copyStateForRemoveIngredient = cloneDeep(state);
      copyStateForRemoveIngredient.ingredients[action.ingredientName] -= 1;
      copyStateForRemoveIngredient.totalPrice -=
        INGREDIENT_PRICES[action.ingredientName];
      copyStateForRemoveIngredient.building = true;
      return copyStateForRemoveIngredient;

    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        building: false
      });

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
