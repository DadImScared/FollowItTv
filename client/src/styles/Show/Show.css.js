
import cyan from '@material-ui/core/colors/cyan';

export default (theme) => ({
  button: {
    position: 'fixed',
    bottom: '20px',
    right: '25px',
    transition: theme.transitions.create(['bottom', 'color', 'background-color'], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      top: '-35px',
      left: '48%'
    },
    [theme.breakpoints.up('xl')]: {
      left: '20%'
    }
  },
  buttonColorSticky: {
    [theme.breakpoints.up('lg')]: {
      backgroundColor: cyan[200]
    }
  },
  slideUpButton: {
    bottom: '56px',
    [theme.breakpoints.up('md')]: {
      bottom: '20px'
    }
  },
  flexContainer: {
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'center'
    }
  },
  appBar: {
    top: 0,
    transition: theme.transitions.create(['top'], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  stickyDown: {
    top: '-1px'
  },
  stickyUp: {
    top: '55px',
    [theme.breakpoints.up('sm')]: {
      top: '63px'
    }
  }
});
