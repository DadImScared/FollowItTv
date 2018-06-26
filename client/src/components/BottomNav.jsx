
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Hidden from '@material-ui/core/Hidden';

import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClockIcon from 'mdi-material-ui/ClockOut';

import styles from '../styles/BottomNavbar';

const navActions = [
  ['schedule', ClockIcon],
  ['menu', MenuIcon],
  ['my shows', FavoriteIcon]
];

export class BottomNav extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      value: 5
    };
  }

  handleChange = (event, value) => {
    const { history, toggleNavdrawer, location: { pathname } } = this.props;
    switch (value) {
      case 0:
        if (pathname === '/schedule') return;
        history.push('/schedule');
        break;
      case 1:
        toggleNavdrawer();
        this.setState({ value: 1 });
        break;
      case 2:
        if (pathname === '/my_shows') return;
        history.push('my_shows');
        break;
      default:
        return;
    }
  };

  componentDidMount() {
    const { location: { pathname } } = this.props;
    this.setValueFromPathname(pathname);
  }

  componentWillReceiveProps(nextProps) {
    const { location: { pathname: oldPathname }, navDrawerOpen: oldDrawerOpen } = this.props;
    const { location: { pathname }, navDrawerOpen } = nextProps;
    if ((oldPathname !== pathname) || (oldDrawerOpen !== navDrawerOpen && !navDrawerOpen)) {
      this.setValueFromPathname(pathname);
    }
  }

  setValueFromPathname = (pathname) => {
    if (pathname.includes('/schedule')) {
      this.setState({ value: 0 });
    }
    else if (pathname.includes('/my_shows')) {
      this.setState({ value: 2 });
    }
    else {
      this.setState({ value: 3 }); // highlight no menu option
    }
  };

  render() {
    const { classes, bottomOfPage, directionDown } = this.props;
    return (
      <Hidden mdUp>
        <BottomNavigation
          value={this.state.value}
          className={classNames(classes.navBar, {
            [classes.hideNavBar]: !bottomOfPage && directionDown,
            [classes.showNavBar]: !directionDown
          })}
          onChange={this.handleChange}
          showLabels
        >
          {
            navActions.map(([actionName, ActionIcon], index) => (
              <BottomNavigationAction
                label={_.startCase(actionName)}
                icon={<ActionIcon />}
                key={index}
              />
            ))
          }
        </BottomNavigation>
      </Hidden>
    );
  }
}

BottomNav.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  classes: PropTypes.shape({
    navBar: PropTypes.string.isRequired,
    hideNavBar: PropTypes.string.isRequired,
    showNavBar: PropTypes.string.isRequired
  }).isRequired,
  bottomOfPage: PropTypes.bool.isRequired,
  directionDown: PropTypes.bool.isRequired,
  navDrawerOpen: PropTypes.bool.isRequired
};

export default withStyles(styles)(BottomNav);
