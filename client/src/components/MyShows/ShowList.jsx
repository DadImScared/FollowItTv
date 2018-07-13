
import React from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import { makeFollowedShows } from '../../reducers/followedShows';


const ShowList = ({ unFollow, followedShows }) => (
  <List>
    {
      followedShows.map((show, index) => (
        <ListItem divider={true} key={`${show.id}-${index}`}>
          <ListItemText primary={show.name} />
          <Button onClick={() => unFollow(show.schedule.days, show.id)}>
            delete
          </Button>
        </ListItem>
      ))
    }
  </List>
);

const makeMapStateToProps = () => {
  const getFollowedShows = makeFollowedShows();
  return (state, props) => {
    return {
      followedShows: getFollowedShows(state, props)
    };
  };
};

export default connect(makeMapStateToProps)(ShowList);
