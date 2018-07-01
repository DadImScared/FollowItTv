
export default (theme) => ({
  appBar: {
    top: 0,
    transition: theme.transitions.create(['top'], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  stickyDown: {
    top: '-1px'
  },
  stickyUp: {
    top: '55px',
    [theme.breakpoints.up('sm')]: {
      top: '63px'
    }
  }
});
