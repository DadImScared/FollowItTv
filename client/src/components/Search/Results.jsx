
import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';


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
