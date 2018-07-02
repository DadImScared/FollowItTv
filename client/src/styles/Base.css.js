
export default (theme) => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    paddingBottom: '1px',
    backgroundColor: '#fff',
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap'
    }
  },
  content: {
    width: '100%',
    padding: theme.spacing.unit * 3,
    minHeight: 'calc(100vh - 112px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      minHeight: 'calc(100vh - 64px)',
      marginTop: 64
    }
  }
});
