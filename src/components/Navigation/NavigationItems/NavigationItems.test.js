/**enzyme package allows us to test components in isolation instead of requiring entire React App to run */
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;
  //runs before each test case
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render two <NavigationItem /> components if unauthenticated", () => {
    // not passing isAuthenticated prop will pass it as false
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> components if authenticated", () => {
    // passing isAuthenticated prop will pass it as true
    wrapper.setProps({ isAuthenticated: true }); //setProps allows us to pass props in helper function
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("should render /logout only if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    // passing isAuthenticated prop will pass it as true
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
