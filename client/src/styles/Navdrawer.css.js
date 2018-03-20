
const drawerWidth = 260;


export default (theme) => ({
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    paddingLeft: theme.spacing.unit * 2,
    alignItems: 'center'
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
