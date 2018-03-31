
import React from 'react';

import Grid from 'material-ui/Grid';

import Episode from '../Episode';

const View = ({ episodeIds, shows, episodes }) => (
  <Grid container>
    {
      episodeIds.length ?
        episodeIds.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={`${episodes[item].id}-${index}`}>
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
