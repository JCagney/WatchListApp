import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

const PrivateRoute = (props) => {
  const context = useContext(UserContext);
  // Destructure props from <privateRoute>
  const { component: Component, ...rest } = props;
  // console.log(props.location)
  return context.authenticated ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: { from: props.location },
      }}
    />
  );
};

export default PrivateRoute;
