
import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


const Results = ({ results, shows }) => (
  <List>
    {
      results.map((result, index) => {
        const show = shows[result] || {};
        return (
          <ListItem key={`${result}-${index}`}>
            <ListItemText>
              <Typography to={`/show/${result}/general`} component={Link}>
                {show.name}
              </Typography>
            </ListItemText>
          </ListItem>
        );
      })
    }
  </List>
);

Results.propTypes = {
  results: PropTypes.array.isRequired,
  shows: PropTypes.object.isRequired
};

export default Results;
