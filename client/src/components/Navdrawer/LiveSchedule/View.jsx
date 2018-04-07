
import React from 'react';

import ExpandedShows from './ExpandedShows';


export const View = ({ today, currentlyAiring, willAir, hasAired, shows }) => (
  <div>
    <div>
      currently airing
    </div>
    {
      willAir.length || hasAired.length ?
        <ExpandedShows
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
