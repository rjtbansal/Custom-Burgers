import React, { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    //in place of componentWillMount since below interceptor code will execute before the JSX mounting happens
    const requestInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <React.Fragment>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
