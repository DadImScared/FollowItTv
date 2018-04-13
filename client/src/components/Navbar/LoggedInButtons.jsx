
import React from 'react';

import { NavLink } from 'react-router-dom';

import Button from 'material-ui/Button';


const LoggedInButtons = ({ logOut }) => (
  <div>
    <Button component={NavLink} to={'/my_shows'}>
      My shows
    </Button>
    <Button onClick={logOut}>
      Sign out
    </Button>
  </div>
);

export default LoggedInButtons;
