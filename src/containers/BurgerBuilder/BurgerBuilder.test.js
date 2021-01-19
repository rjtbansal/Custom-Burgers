import React from "react";
import { BurgerBuilder } from "./BurgerBuilder";

//note that we added export keyword before BurgerBuilder class in order to be able to import it as named export so that we can test it in isolation since our default export
//is connected to redux store
//here we dont want to test whether it passes props correctly to redux store since redux being 3rd party package will take care of it

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    //we have to pass empty onInitIngredients prop because upon mounting it cant find this function prop so we need to let it know
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it("should render <BuildControls /> when receiving ingredients", () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
