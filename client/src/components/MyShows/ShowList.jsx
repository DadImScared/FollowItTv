
import React from 'react';

import List, {
  ListItem,
  ListItemText
} from 'material-ui/List';


const ShowList = ({ showList, shows }) => (
  <List>
    {
      showList.map((show, index) => (
        <ListItem divider={true} key={`${show}-${index}`}>
          <ListItemText primary={shows[show].name} />
        </ListItem>
      ))
    }
  </List>
);

export default ShowList;
