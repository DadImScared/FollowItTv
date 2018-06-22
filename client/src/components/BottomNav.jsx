
import React, { Component } from 'react';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Hidden from '@material-ui/core/Hidden';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import styles from '../styles/BottomNavbar';


class BottomNav extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      value: 0,
      initialize: false
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, bottomOfPage, directionDown } = this.props;
    return (
      <Hidden mdUp>
        <BottomNavigation
          value={this.state.value}
          className={classNames({
            [classes.hideNavBar]: !bottomOfPage && directionDown,
            [classes.showNavBar]: !directionDown
          })}
          onChange={this.handleChange}
          showLabels
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Hidden>
    );
  }
}

export default withStyles(styles)(BottomNav);
