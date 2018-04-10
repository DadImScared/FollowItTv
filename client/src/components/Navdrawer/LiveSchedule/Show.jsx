
import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { ListItem, ListItemText } from 'material-ui/List';

import Countdown from '../../Countdown';


const Show = ({ show, showTimer, moveShow, currentStep, ...other }) => (
  <ListItem {...other}>
    <ListItemText
      primary={show.name}
      secondary={
        showTimer ?
          <Countdown
            callBack={() => moveShow(currentStep, show.id)}
            eventTime={
              currentStep === 'currentlyAiring' ?
                moment(show.schedule.time, 'HH:mm').add(show.runtime, 'minutes')
                :
                moment(show.schedule.time, 'HH:mm')
            }
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
  currentStep: PropTypes.string
};

Show.defaultProps = {
  showTimer: true,
  currentStep: 'willAir'
};

export default Show;
