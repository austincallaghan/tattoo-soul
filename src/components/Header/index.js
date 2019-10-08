import React from 'react';
import { AuthUserContext } from '../Session';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import './header.css';

import WhiteMenu from '../../assets/white-menu.svg';

const Header = props => {
  return (
    <AuthUserContext.Consumer>
      {authUser => <HeaderInner authUser={authUser} {...props} />}
    </AuthUserContext.Consumer>
  );
};

const HeaderInner = ({
  authUser,
  toggleMobileMenu,
  history,
  firebase,
}) => {
  return (
    <div className="header--container">
      <div className="header--section-one">
        <div className="header--burger" onClick={toggleMobileMenu}>
          <img src={WhiteMenu} />
        </div>
        <div className="header--headline">Tattoo Ink</div>
      </div>

      {authUser ? (
        <div className="header--dropdown">
          <span>{authUser.username}</span>
          <div className="header--content">
            <a onClick={() => history.push('/account')}>Account</a>
            <a onClick={() => history.push('/admin')}>Admin</a>
            <a onClick={firebase.doSignOut}>Sign Out</a>
            <a onClick={() => history.push('/account')}>Dashboard</a>
            <a
              onClick={() => history.push(`/profile/${authUser.uid}`)}
            >
              My Profile
            </a>
            <a onClick={() => history.push('/auth/my-profile')}>
              Edit Profile
            </a>
          </div>
        </div>
      ) : (
        <div className="header--user-info">
          <span onClick={() => history.push('/signin')}>Log In</span>{' '}
          |{' '}
          <span onClick={() => history.push('/signup')}>Sign Up</span>
        </div>
      )}
    </div>
  );
};

export default withRouter(withFirebase(Header));
