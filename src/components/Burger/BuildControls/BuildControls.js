import React from "react";
import classes from "./BuildControls.module.scss";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Total Price: <strong>${props.totalPrice.toFixed(2) || 0}</strong>
    </p>
    {controls.map((control) => (
      <BuildControl
        disabled={props.disabled[control.type]}
        removed={() => props.ingredientRemoved(control.type)}
        added={() => props.ingredientAdded(control.type)}
        key={control.type}
        label={control.label}
      />
    ))}
    <button
      disabled={!props.canBePurchased}
      className={classes.OrderButton}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  </div>
);

export default BuildControls;
