
import React from 'react';

import Button from 'material-ui/Button';


const LoggedInButtons = ({ logOut }) => (
  <div>
    <Button>
      My shows
    </Button>
    <Button onClick={logOut}>
      Sign out
    </Button>
  </div>
);

export default LoggedInButtons;
