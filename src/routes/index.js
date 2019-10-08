import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

import LandingPage from '../components/Landing';
import SignUpPage from '../components/SignUp';
import SignInPage from '../components/SignIn';
import PasswordForgetPage from '../components/PasswordForget';
import HomePage from '../components/Home';
import AccountPage from '../components/Account';
import AdminPage from '../components/Admin';
import About from '../components/About';
import Tattoos from '../components/Tattoos';

import AuthRoutes from './Auth';
import Profile from './Profile';

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />

      <Route path={'/tattoos'} component={Tattoos} />
      <Route path={'/about'} component={About} />
      <Route path={ROUTES.AUTH} component={AuthRoutes} />
      <Route path={'/profile/:id'} component={Profile} />
      <Route path={ROUTES.LANDING} component={LandingPage} />
    </Switch>
  );
}
