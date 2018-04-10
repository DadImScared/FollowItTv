
import React from 'react';

import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import ExpandedShows from './ExpandedShows';
import Show from './Show';
import { LiveSchedule } from '../../../styles/Navdrawer';


const { currentlyAiring: styles } = LiveSchedule;

export const View = ({ classes, today, currentlyAiring, willAir, hasAired, shows, moveShow, episodes }) => (
  <div style={{ padding: '8px' }} className={classes.background}>
    <Typography align={'center'}>
      Todays Schedule
    </Typography>
    <ExpansionPanel expanded={true}>
      <ExpansionPanelSummary className={classes.panelSummary}>
        <Typography>Currently airing</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.panelDetail }}>
        <Paper className={classes.listBackground} style={{ width: '100%' }}>
          {
            currentlyAiring.length ?
              <List style={{ maxHeight: '300px', overflow: 'auto' }}>
                {
                  currentlyAiring.map((item, index) => (
                    <Show
                      currentStep={'currentlyAiring'}
                      key={`${item}-${index}`}
                      show={shows[episodes[item].show] || {}}
                      moveShow={moveShow}
                      eventTime={episodes[item].airtime}
                      episodeId={item}
                    />
                  ))
                }
              </List>
              :
              <div>no shows!</div>
          }
        </Paper>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    {
      willAir.length || hasAired.length ?
        <ExpandedShows
          moveShow={moveShow}
          shows={shows}
          episodes={episodes}
          panels={[
            [(willAir.length && willAir) || [], 'Airing soon'],
            [(hasAired.length && hasAired) || [], 'Already aired']
          ]}
        />
        :
        <div>loading</div>
    }
  </div>
);

export default withStyles(styles)(View);
