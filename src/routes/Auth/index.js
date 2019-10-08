import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthMyProfile } from './MyProfile';
import * as ROUTES from '../../constants/routes';

const AuthRoutes = ({ match }) => {
  return (
    <Switch>
      <Route
        exact
        path={`${match.path}${ROUTES.MY_PROFILE}`}
        component={AuthMyProfile}
      />
    </Switch>
  );
};

export default AuthRoutes;
