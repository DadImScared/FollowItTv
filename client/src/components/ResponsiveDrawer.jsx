
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

const ResponsiveDrawer = ({ drawerClasses, anchor = 'left', children, isOpen, handleClose, id }) => {
  return (
    [
      <Hidden mdUp key={`hidden-up-drawer-${id}`}>
        <Drawer
          disableRestoreFocus={true}
          variant='temporary'
          anchor={anchor}
          open={isOpen}
          onClose={handleClose}
          classes={drawerClasses}
        >
          {children}
        </Drawer>
      </Hidden>,
      <Hidden smDown key={`hidden-down-drawer-${id}`}>
        <Drawer
          variant='permanent'
          open
          anchor={anchor}
          classes={drawerClasses}
        >
          {children}
        </Drawer>
      </Hidden>
    ]
  );
};

export default ResponsiveDrawer;

