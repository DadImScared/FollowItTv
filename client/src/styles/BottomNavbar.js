
export default (theme) => ({
  navBar: {
    width: '100%',
    position: 'sticky',
    bottom: 0,
    overflow: 'auto',
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
