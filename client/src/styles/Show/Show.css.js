
export default (theme) => ({
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '25px',
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      top: '-35px',
      left: '5%'
    },
    [theme.breakpoints.up('xl')]: {
      left: '20%'
    }
  },
  flexContainer: {
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center'
    }
  }
});
