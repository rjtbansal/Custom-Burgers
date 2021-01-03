import * as actionTypes from "./actions";
import { cloneDeep } from "lodash";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const copyStateForAddIngredient = cloneDeep(state);
      copyStateForAddIngredient.ingredients[action.ingredientName] += 1;
      return copyStateForAddIngredient;
      // return {
      //   // ...state,
      //   // ingredients: {
      //   //   ...state.ingredients,
      //   //   [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      //   // }
      // };

    case actionTypes.REMOVE_INGREDIENT:
      const copyStateForRemoveIngredient = cloneDeep(state);
      copyStateForRemoveIngredient.ingredients[action.ingredientName] -= 1;
      return copyStateForRemoveIngredient;
    
    default: return state;
  }
};

export default reducer;
