import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import * as actions from "./store/actions/";

function App(props) {
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props]);
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

//wrapping entire App component breaks the router. So we need to wrap it with withRouter HOC provided by react-router-dom
//this will allow props to get passed to App component
export default withRouter(connect(null, mapDispatchToProps)(App));
