
import React from 'react';

import { NavLink, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';


const LoggedInButtons = () => (
  <div>
    <Button component={NavLink} to={'/my_shows'}>
      My shows
    </Button>
    <Button component={Link} to={'/logout'}>
      Sign out
    </Button>
  </div>
);

export default LoggedInButtons;
