
import { image } from './Crew.css';

export default (theme) => ({
  col: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      width: '50%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    },
    [theme.breakpoints.only('lg')]: {
      width: '25%'
    },
    [theme.breakpoints.only('xl')]: {
      width: '16.6%'
    }
  },
  image: image(theme)
});
