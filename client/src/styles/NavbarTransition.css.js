
export default (theme) => ({
  showNavBar: {
    [theme.breakpoints.down('md')]: {
      transition: theme.transitions.create(['opacity'], {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.enteringScreen
      }),
      opacity: 1
    }
  },
  hideNavBar: {
    [theme.breakpoints.down('md')]: {
      transition: theme.transitions.create(['opacity'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.leavingScreen
      }),
      opacity: 0
    }
  }
});
