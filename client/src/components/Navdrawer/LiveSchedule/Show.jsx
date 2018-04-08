
import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { ListItem, ListItemText } from 'material-ui/List';

import Countdown from '../../Countdown';


const Show = ({ show, showTimer, moveShow, showId, currentStep, ...other }) => (
  <ListItem {...other}>
    <ListItemText
      primary={show.name}
      secondary={
        showTimer ?
          <Countdown
            callBack={() => moveShow(currentStep, showId)}
            eventTime={moment(show.schedule.time, 'HH:mm').add(show.runtime, 'minutes')}
          />
          :
          show.schedule.time
      }
    />
  </ListItem>
);

Show.propTypes = {
  show: PropTypes.object.isRequired,
  moveShow: PropTypes.func.isRequired,
  showTimer: PropTypes.bool,
  currentStep: PropTypes.string,
  showId: PropTypes.number.isRequired
};

Show.defaultProps = {
  showTimer: true,
  currentStep: 'willAir'
};

export default Show;
