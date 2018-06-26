
import React from 'react';

import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';


const LoggedOutButtons = () => (
  <div>
    <Button component={NavLink} to={'/login'}>
      Sign in
    </Button>
    <Button component={NavLink} to={'/register'}>
      Sign up
    </Button>
  </div>
);

export default LoggedOutButtons;
