
import cyan from '@material-ui/core/colors/cyan';
import deepPurple from '@material-ui/core/colors/deepPurple';

export const image = (theme) => ({
  height: '25vh',
  margin: '0 auto',
  backgroundSize: 'contain',
  [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
    height: '50vh'
  },
  [theme.breakpoints.up('md')]: {
    height: '20vh'
  }
});

export default (theme) => ({
  col: {
    width: '100%',
    padding: theme.spacing.unit,
    [`${theme.breakpoints.only('xs')} and (orientation: landscape)`]: {
      width: '50%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    },
    '@media only screen and (min-width: 800px) and (orientation: landscape)': {
      width: '33.3%'
    },
    [theme.breakpoints.only('md')]: {
      width: '50%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '33.3%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '20%'
    }
  },
  card: {},
  content: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  chipBase: {
    margin: '4px 4px 4px 0',
    color: 'white'
  },
  chipMain: {
    backgroundColor: cyan['800']
  },
  chipSecondary: {
    backgroundColor: deepPurple[900]

  },
  chipOthers: {
    backgroundColor: deepPurple['A400']
  },
  image: image(theme)
});
