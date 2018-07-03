
export default (theme) => ({
  navBar: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    overflow: 'auto',
    zIndex: 1000,
    [theme.breakpoints.down('md')]: {
      transition: theme.transitions.create(['height'], {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  },
  hideNavBar: {
    [theme.breakpoints.down('md')]: {
      height: '0'
    }
  }
});
