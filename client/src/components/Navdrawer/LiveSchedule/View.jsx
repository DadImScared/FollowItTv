
import React from 'react';

import moment from 'moment';

import Countdown from '../../Countdown';
import ExpandedShows from './ExpandedShows';


export const View = ({ today, currentlyAiring, willAir, hasAired, shows, moveShow }) => (
  <div>
    <div>
      currently airing
      {
        currentlyAiring.map((item, index) => (
          <div key={`${item}-${index}`}>
            {
              shows[item] ?
                <div>
                  {shows[item].name}
                  <Countdown
                    callBack={() => moveShow('currentlyAiring', item)}
                    eventTime={moment(shows[item].schedule.time, 'HH:mm').add(shows[item].runtime, 'minutes')}
                  />
                </div>
                :
                null
            }
          </div>
        ))
      }
    </div>
    {
      willAir.length || hasAired.length ?
        <ExpandedShows
          moveShow={moveShow}
          shows={shows}
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

export default View;
