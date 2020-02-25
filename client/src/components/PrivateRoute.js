// Stage 1 - Authentication
// Step 4 - Build a `PrivateRoute` component and use it to protect a route that renders the`BubblesPage` component
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Three rules when building a PrivateRoute component
// 1. It has the same API as <Route /> (same props as Route)
// 2. It renders a <Route /> and passes all the props through to it
// 3. It checks if the user is authenticated, if they are, it renders the "component" prop. If not, it redirects the user to /login

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      { ...rest }
      render = {() => {
        if (localStorage.getItem('token')) {
          return <Component />;
          // push to component prop
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;