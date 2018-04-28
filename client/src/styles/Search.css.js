
export default (theme) => ({
  container: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '70%',
      margin: '0 auto'
    },
    [theme.breakpoints.only('xl')]: {
      width:'50%'
    },
    '& a': {
      textDecoration: 'none'
    }
  }
});
