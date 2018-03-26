
import React from 'react';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import RegisterForm from './RegisterForm';
import ReSendEmail from '../ReSendEmail';
import styles from '../../styles/Register.css';

export const View = ({ classes, shouldShow, ...other }) => (
  <Paper classes={{ root: classes.paperBackground }}>
    <Typography align={'center'} variant={'title'}>
      Sign up
    </Typography>
    <div className={classes.container}>
      {
        shouldShow ?
          <ReSendEmail shouldShow={shouldShow} {...other} />
          :
          null
      }
      <RegisterForm classes={classes} {...other} />
    </div>
  </Paper>
);

export default withStyles(styles)(View);
