import React, { useState } from 'react';

import {
  AuthUserContext,
  withAuthorization,
} from '../../../components/Session';
import { withFirebase } from '../../../components/Firebase';

import { DisplayProfile } from './DisplayProfile';
import { EditProfile } from './EditProfile';

const condition = authUser => !!authUser;

const ProfileWrapper = props => {
  let [state, setContainerState] = useState({ edit: false });

  return (
    <AuthUserContext.Consumer>
      {authUser =>
        state.edit ? (
          <EditProfile
            authUser={authUser}
            {...props}
            setContainerState={setContainerState}
          />
        ) : (
          <DisplayProfile
            authUser={authUser}
            {...props}
            setContainerState={setContainerState}
          />
        )
      }
    </AuthUserContext.Consumer>
  );
};

export default withFirebase(ProfileWrapper);

export const AuthMyProfile = withAuthorization(condition)(props => (
  <ProfileWrapper {...props} />
));
