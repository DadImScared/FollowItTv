
import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Season from './Season';


const View = ({ seasons, changePanel, expanded, ...other }) => (
  <div>
    {
      Object.values(seasons).map((season, index) => (
        <ExpansionPanel
          expanded={expanded === index}
          onChange={(event, expanded) => changePanel(expanded, index)}
          key={`${season.id}-${index}`}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ marginRight: '5px' }}>season {index + 1}</Typography>
            <Typography>aired {season.premiereDate} to {season.endDate}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {
              expanded === index ?
                <Season season={season} {...other} />
                :
                <Typography>season {index + 1}</Typography>
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))
    }
  </div>
);

export default View;
