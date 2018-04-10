
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import Show from './Show';
import { LiveSchedule } from '../../../styles/Navdrawer';

const { expandedShows: styles } = LiveSchedule;


export class ExpandedShows extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      expanded: false
    };
  }

  componentDidMount() {
    const { panels } = this.props;
    this.changePanel(true, panels[0][0].length ? 0:1);
  }

  changePanel = (expanded, panel) => {
    this.setState({
      expanded: expanded ? panel:false
    });
  };

  render() {
    const { panels, shows, episodes, moveShow, classes } = this.props;
    const { expanded } = this.state;
    return (
      <div>
        {
          panels.map(([panel, description], index) => {
            const panelName = description === 'Airing soon' ? 'willAir':'hasAired';
            return (
              <ExpansionPanel
                expanded={expanded === index}
                onChange={(event, expanded) => this.changePanel(expanded, index)}
                key={`${description}-${index}`}>
                <ExpansionPanelSummary classes={{ root: classes[`${panelName}Summary`] }} expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    {description}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{ root: classes[`${panelName}Detail`] }}>
                  <Paper className={classes[`${panelName}List`]}>
                    <List className={classes.innerList}>
                      {
                        episodes ?
                          panel.map((item, index) => {
                            const show = shows[episodes[item].show] || {};
                            return (
                              <Show
                                episodeId={item}
                                key={`${item}-${index}`}
                                showTimer={show.schedule && description === 'Airing soon'}
                                show={show}
                                moveShow={moveShow}
                                eventTime={episodes[item].airtime}
                              />
                            );
                          })
                          :
                          <div>loading</div>
                      }
                    </List>
                  </Paper>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
        }
      </div>
    );
  }
}

ExpandedShows.propTypes = {
  panels: PropTypes.array.isRequired,
  shows: PropTypes.object.isRequired,
  moveShow: PropTypes.func.isRequired
};

export default withStyles(styles)(ExpandedShows);

