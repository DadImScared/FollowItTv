
import React from 'react';

import Grid from '@material-ui/core/Grid';

import Episode from '../Episode';

const View = ({ episodeIds, shows, episodes }) => (
  <Grid container style={{ padding: '8px' }}>
    {
      episodeIds.length ?
        episodeIds.map((item, index) => {
          return (
            <Grid style={{ padding: '8px' }} item xs={12} sm={6} lg={4} xl={3} key={`${episodes[item].id}-${index}`}>
              <Episode
                shows={shows}
                item={episodes[item]}
              />
            </Grid>
          );
        })
        :
        <div>no results</div>
    }
  </Grid>
);

export default View;
