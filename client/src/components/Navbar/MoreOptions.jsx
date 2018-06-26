
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export class MoreOptions extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (route) => {
    this.setState({ anchorEl: null });
    typeof route === 'string' && this.props.history.push(route);
  };

  logOut = () => {
    this.props.logOut();
    this.handleClose('');
  };

  render() {
    const { anchorEl } = this.state;
    const { loggedIn } = this.props;
    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Icon>more_vert</Icon>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {
            loggedIn ?
              <MenuItem onClick={this.logOut}>Log out</MenuItem>
              :
              <Fragment>
                <MenuItem onClick={() => this.handleClose('/login')}>
                  Sign up
                </MenuItem>
                <MenuItem onClick={() => this.handleClose('/register')}>
                  Register
                </MenuItem>
              </Fragment>
          }
        </Menu>
      </div>
    );
  }
}

MoreOptions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired
};

export default MoreOptions;
