import React from "react";
import classes from "./Burger.module.scss";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const Burger = (props) => {

  const { ingredients } = props;
  let mappedIngredients = [];
  for (const ingredient in ingredients) {
    const quantity = ingredients[ingredient];
    for (let i = 0; i < quantity; i++) {
      mappedIngredients.push(<BurgerIngredient type={ingredient} />);
    }
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      { mappedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
