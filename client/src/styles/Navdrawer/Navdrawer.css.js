
const drawerWidth = 260;


export default (theme) => ({
  divider: {
    backgroundColor: theme.palette.secondary.light
  },
  drawerHeaderTitle: {
    color: theme.palette.secondary.contrastText,
    marginRight: theme.spacing.unit
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    paddingLeft: theme.spacing.unit * 2,
    alignItems: 'center',
    backgroundColor: theme.palette.primary.dark
  },
  drawerPaper: {
    width: 250,
    height: '100%',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative'
    }
  }
});
