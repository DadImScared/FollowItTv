
const mediaQueryWidth543 = '@media only screen and (min-width: 543px)';

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
  paper: {
    padding: '4px',
    [mediaQueryWidth543]: {
      padding: theme.spacing.unit * 2
    },
    [theme.breakpoints.up('md')]: {
      width: '50vw'
    },
    [theme.breakpoints.up('lg')]: {
      width: '40vw'
    },
    ['@media only screen and (min-width: 1862px)']: {
      width: '50%'
    }
  },
  summaryWrapper: {
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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
    [mediaQueryWidth543]: {
      width: '25%'
    },
    ['@media only screen and (min-width: 704px)']: {
      width: '15%'
    },
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
