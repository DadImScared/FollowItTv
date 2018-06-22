
export default (theme) => ({
  col: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    },
    [theme.breakpoints.only('lg')]: {
      width: '25%'
    },
    [theme.breakpoints.only('xl')]: {
      width: '20%'
    }
  },
  image: {
    height: '25vh',
    margin: '0 auto',
    backgroundSize: 'contain',
    [`${theme.breakpoints.down('md')} and (orientation: landscape)`]: {
      height: '50vh'
    }
  }
});
