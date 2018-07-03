
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-component';

import Episode from '../Episode';
import styles from '../../styles/Schedule.css';

const View = ({ classes, episodeIds, shows, episodes, setMasonryRef, expandContentCb }) => (
  <div className={classes.wrapper}>
    <Masonry options={{ horizontalOrder: true }} ref={setMasonryRef}>
      {
        episodeIds.length ?
          episodeIds.map((item, index) => {
            // decrease z-index per card so when one is expanded it covers the element below it before masonry adjusts
            // the layout
            return (
              <div style={{ zIndex: 500 - index }} className={classes.col} key={`${episodes[item].id}-${index}`}>
                <Episode
                  handleExpandCb={expandContentCb}
                  shows={shows}
                  item={episodes[item]}
                />
              </div>
            );
          })
          :
          <div>no results</div>
      }
    </Masonry>
  </div>
);

export default withStyles(styles)(View);
