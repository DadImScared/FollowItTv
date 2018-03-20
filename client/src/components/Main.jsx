
import React from 'react';

import { withStyles } from 'material-ui/styles';

import styles from '../styles/Main.css';

const Main = ({ classes }) => (<div className={classes.content}>main area</div>);

export default withStyles(styles)(Main);
