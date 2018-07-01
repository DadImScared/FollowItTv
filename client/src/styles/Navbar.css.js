
const drawerWidth = 260;

export default (theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    marginLeft: drawerWidth,
    overflow: 'auto',
    height: '56px',
    [theme.breakpoints.up('sm')]: {
      height: '64px'
    },
    [theme.breakpoints.down('md')]: {
      transition: theme.transitions.create(['height'], {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  showNavButtons: {
    display: 'flex'
  },
  hideNavBar: {
    [theme.breakpoints.down('md')]: {
      height: 0
    }
  }
});
