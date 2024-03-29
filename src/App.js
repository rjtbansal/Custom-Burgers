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

  const { onTryAutoSignup } = props; 
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      {/* redirect to / if nothing matches */}
      <Redirect to="/" />
    </>
  );

  if (props.isAuthenticated) {
    routes = (
      <>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
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
