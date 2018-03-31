
export default (theme) => ({
  container: {
    padding: theme.spacing.unit
  },
  img: {
    float: 'left',
    height: '30%',
    width: '30%',
    marginRight: theme.spacing.unit
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
