import React, { useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import * as actions from "./store/actions/";

const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
const Auth = lazy(() => import("./containers/Auth/Auth"));

function App(props) {
  useEffect(() => {
    props.onTryAutoSignup();
  }, [props]);

  let routes = (
    <>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact component={BurgerBuilder} />
      {/* redirect to / if nothing matches */}
      <Redirect to="/" />
    </>
  );

  if (props.isAuthenticated) {
    routes = (
      <>
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/orders" render={() => <Orders />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </>
    );
  }

  return (
    <div>
      <Layout>
        <Switch>
          {/* what to render while lazy loading is on */}
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
        </Switch>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

//wrapping entire App component breaks the router. So we need to wrap it with withRouter HOC provided by react-router-dom
//this will allow props to get passed to App component
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
