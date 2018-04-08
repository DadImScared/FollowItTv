
const drawerWidth = 260;

export default (theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  }
});
