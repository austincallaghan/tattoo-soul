import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import MobileMenu from '../MobileMenu';

import Routes from '../../routes/index';

import '../MobileMenu/mobileMenu.css';

import { withAuthentication } from '../Session';

const App = props => {
  const [state, setState] = useState({
    menuState: false,
  });

  const toggleMobileMenu = () => {
    setState({ menuState: !state.menuState });
  };

  return (
    <BrowserRouter>
      <MobileMenu
        menuOpen={state.menuState}
        toggleMobileMenu={toggleMobileMenu}
      />
      <Header toggleMobileMenu={toggleMobileMenu} />
      <Routes />
      {/* <Navigation /> */}
    </BrowserRouter>
  );
};

export default withAuthentication(App);
