
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';

import MenuItemLink from './MenuItemLink';

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

  handleClose = () => {
    this.setState({ anchorEl: null });
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
              <MenuItemLink handleClose={this.handleClose} routeName={'/logout'} text={'Log out'}/>
              :
              <Fragment>
                <MenuItemLink handleClose={this.handleClose} routeName={'/login'} text={'Sign in'} />
                <MenuItemLink handleClose={this.handleClose} routeName={'/register'} text={'Sign up'} />
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
  loggedIn: PropTypes.bool.isRequired
};

export default MoreOptions;
