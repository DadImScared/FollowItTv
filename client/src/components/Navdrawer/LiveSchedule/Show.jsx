
import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { ListItem, ListItemText } from 'material-ui/List';

import Countdown from '../../Countdown';


const Show = ({ show, showTimer, moveShow, currentStep, eventTime, episodeId, ...other }) => (
  <ListItem {...other}>
    <ListItemText
      primary={show.name}
      secondary={
        showTimer ?
          <Countdown
            callBack={() => moveShow(currentStep, episodeId)}
            eventTime={
              currentStep === 'currentlyAiring' ?
                moment(eventTime, 'YYYY-MM-DD HH:mm').add(show.runtime, 'minutes')
                :
                moment(eventTime, 'HH:mm')
            }
          />
          :
          eventTime
      }
    />
  </ListItem>
);

Show.propTypes = {
  show: PropTypes.object.isRequired,
  moveShow: PropTypes.func.isRequired,
  eventTime: PropTypes.string.isRequired,
  episodeId: PropTypes.number.isRequired,
  showTimer: PropTypes.bool,
  currentStep: PropTypes.string
};

Show.defaultProps = {
  showTimer: true,
  currentStep: 'willAir'
};

export default Show;
