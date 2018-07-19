
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';

class MenuItemLink extends Component {

  onClick = () => {
    const { handleClose, routeName } = this.props;
    handleClose(routeName);
  };

  render() {
    return (
      <MenuItem component={Link} to={this.props.routeName} onClick={this.onClick}>
        {this.props.text}
      </MenuItem>
    );
  }
}

MenuItemLink.propTypes = {
  handleClose: PropTypes.func.isRequired,
  routeName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default MenuItemLink;
