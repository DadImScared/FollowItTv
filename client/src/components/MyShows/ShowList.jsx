
import React from 'react';

import List, {
  ListItem,
  ListItemText
} from 'material-ui/List';
import Button from 'material-ui/Button';


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
