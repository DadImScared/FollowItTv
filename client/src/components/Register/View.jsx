
import React from 'react';

import RegisterForm from './RegisterForm';
import ReSendEmail from '../ReSendEmail';

export const View = ({ classes, ...other }) => (
  <div>
    <ReSendEmail {...other} />
    <RegisterForm classes={classes} {...other} />
  </div>
);

export default View;
