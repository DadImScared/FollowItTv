
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { General as styles } from '../../../styles/Show';
import showInfo from './showInfo';
import LatestEpisode from './LatestEpisode';
import Summary from '../../Summary';


const General = ({ show, classes }) => (
  <div className={classes.container}>
    <div className={classes.summaryWrapper}>
      <Paper className={classes.paper}>
        <img className={classes.img} src={show.image && show.image.medium || ''} />
        <Typography component={'div'} className={classes.summary}>
          {
            show.summary ?
              <Summary summary={show.summary} />
              :
              'no summary'
          }
        </Typography>
      </Paper>
    </div>
    <div style={{ display: 'flex', 'flexDirection': 'column' }}>
      <Paper className={classes.showInfo}>
        {
          showInfo.map((item, index) => {
            const styles = {};
            if (index % 2 === 0) {
              styles.paddingLeft = '4px';
            }
            else {
              styles.paddingRight = '4px';
            }
            return (
              <div style={styles} className={classes.showInfoItem} key={`${index}`}>
                {item(show)}
              </div>
            );
          })
        }
      </Paper>
      {
        show && show._links ?
          <LatestEpisode {...show._links} />
          :
          null
      }
    </div>
  </div>
);

export default withStyles(styles)(General);
