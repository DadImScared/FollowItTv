
export default (theme) => ({
  wrapper: {
    padding: theme.spacing.unit
  },
  col: {
    width: '100%',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    },
    [theme.breakpoints.only('lg')]: {
      width: '33%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '25%'
    }
  }
});
