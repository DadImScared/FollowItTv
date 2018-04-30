
export default (theme) => ({
  container: {
    height: '100%',
    padding: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    }
  },
  summaryWrapper: {
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.up('lg')]: {
      width: '40%',
      flexDirection: 'column'
    }
  },
  img: {
    float: 'left',
    height: 'auto',
    width: '40%',
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      float: 'none',
      objectFit: 'contain',
      width: 'auto'
    }
  },
  summary: {
    display: 'inline',
    clear: 'both'
  },
  showInfo: {
    marginTop: theme.spacing.unit * 2,
    height: '200px',
    display: 'flex',
    flexWrap: 'wrap'
  },
  showInfoItem: {
    width: '50%',
    height: '33%',
    display: 'flex',
    alignItems: 'center'
  }
});
