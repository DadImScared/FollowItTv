
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ReSendEmail from '../ReSendEmail';
import LoginForm from './LoginForm';

import styles from '../../styles/Login.css';


const View = ({ classes, ...other }) => (
  <Paper classes={{ root: classes.paperBackground }}>
    <Typography align={'center'} variant={'title'}>
      Sign in
    </Typography>
    <div className={classes.container}>
      <ReSendEmail {...other} afterSend={true} />
      <LoginForm classes={classes} {...other} />
    </div>
  </Paper>
);

export default withStyles(styles)(View);
