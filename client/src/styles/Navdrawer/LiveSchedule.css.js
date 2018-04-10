
import green from 'material-ui/colors/green';
import orange from 'material-ui/colors/orange';
import red from 'material-ui/colors/red';


const currentlyAiring = (theme) => ({
  background: {
    backgroundColor: theme.palette.primary.main,
    minHeight: 'calc(100% - 57px)',
    [theme.breakpoints.up('md')]: {
      minHeight: 'calc(100% - 65px)'
    }
  },
  panelSummary: {
    border: `solid 1px ${green[700]}`
  },
  panelDetail: {
    border: `solid 1px ${green[500]}`,
    backgroundColor: green[300],
    padding: '16px'
  },
  listBackground: {
    backgroundColor: green[100]
  }
});

const expandedShows = (theme) => ({
  innerList: {
    maxHeight: '200px',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      maxHeight: '250px'
    }
  },
  willAirSummary: {
    border: `solid 1px ${orange[700]}`
  },
  willAirDetail: {
    border: `solid 1px ${orange[500]}`,
    backgroundColor: orange[300],
    padding: '16px'
  },
  willAirList: {
    backgroundColor: orange[100]
  },
  hasAiredSummary: {
    border: `solid 1px ${red[700]}`
  },
  hasAiredDetail: {
    border: `solid 1px ${red[500]}`,
    backgroundColor: red[300],
    padding: '16px'
  },
  hasAiredList: {
    backgroundColor: red[100]
  }
});

export default {
  currentlyAiring,
  expandedShows
};
