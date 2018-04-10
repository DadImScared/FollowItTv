
import React from 'react';

import { withStyles } from 'material-ui/styles';

import styles from '../styles/Summary.css';


export const Summary = ({ classes, summary, setRef, ...other }) => (
  <div ref={setRef} className={classes.wrapper} {...other} dangerouslySetInnerHTML={{ __html: summary }} />
);

export default withStyles(styles)(Summary);
