import React from 'react';
import classes from "./BuildControls.module.scss";
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: "Salad" , type: "salad"},
  { label: "Bacon" , type: "bacon"},
  { label: "Cheese" , type: "cheese"},
  { label: "Meat" , type: "meat"},
];
const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    {
      controls.map(control => (
        <BuildControl disabled={props.disabled[control.type]} removed={() => props.ingredientRemoved(control.type)} added={() => props.ingredientAdded(control.type)} key={control.type} label={control.label} />
      ))
    }
  </div>
);

export default BuildControls;