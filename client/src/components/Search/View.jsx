
import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Results from './Results';
import styles from '../../styles/Search.css';


const View = ({ classes, shows, results, isLoading, errorMessage }) => (
  <Paper className={classes.container}>
    {
      errorMessage ?
        <Typography>
          {errorMessage}
        </Typography>
        :
        null
    }
    {
      isLoading ?
        <div>loading</div>
        :
        results.length ?
          <Results results={results} shows={shows}/>
          :
          <div>no results</div>
    }
  </Paper>
);

View.propTypes = {
  classes: PropTypes.object.isRequired,
  shows: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

export default withStyles(styles)(View);
