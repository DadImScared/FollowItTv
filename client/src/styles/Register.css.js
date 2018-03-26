
export default (theme) => ({
  paperBackground: {
    padding: theme.spacing.unit * 2,
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60vw',
      margin: '0 auto'
    },
    [theme.breakpoints.up('lg')]: {
      width: '40vw'
    }
  },
  fieldStyle: {
    marginBottom: theme.spacing.unit * 2
  },
  container: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50vw',
      margin: '0 auto'
    },
    [theme.breakpoints.up('md')]: {
      width: '40vw'
    },
    [theme.breakpoints.up('lg')]: {
      width: '20vw'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  }
});
