
import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';


const ShowList = ({ showList, shows, unFollow }) => (
  <List>
    {
      showList.map((show, index) => (
        <ListItem divider={true} key={`${show}-${index}`}>
          <ListItemText primary={shows[show].name} />
          <Button onClick={() => unFollow(shows[show].schedule.days, shows[show].id)}>
            delete
          </Button>
        </ListItem>
      ))
    }
  </List>
);

export default ShowList;
