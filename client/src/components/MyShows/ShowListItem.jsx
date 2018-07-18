
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

class ShowListItem extends React.PureComponent {

  unFollow = () => {
    const { show } = this.props;
    this.props.unFollow(show);
  };

  render() {
    const { show } = this.props;
    return (
      <ListItem component={Link} to={`/show/${show.id}`} button divider={true}>
        <ListItemText style={{ flex: '0.7 1 auto' }} primary={show.name} />
        <ListItemSecondaryAction>
          <Button onClick={this.unFollow}>
            delete
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

ShowListItem.propTypes = {
  show: PropTypes.object.isRequired,
  unFollow: PropTypes.func.isRequired
};

export default ShowListItem;
