
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-component';
import DatePicker from 'material-ui-pickers/DatePicker';

import Episode from '../Episode';
import styles from '../../styles/Schedule.css';

const View = ({
  classes,
  episodeIds,
  shows,
  episodes,
  setMasonryRef,
  expandContentCb,
  selectedDate,
  handleDateChange
}) => (
  <div className={classes.wrapper}>
    <div className={classes.datePickerWrapper}>
      <DatePicker label='Select date' autoOk showTodayButton value={selectedDate} onChange={handleDateChange} />
    </div>
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
