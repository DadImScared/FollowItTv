
import React from 'react';

import Grid from 'material-ui/Grid';

import Episode from '../Episode';

const View = ({ episodes, shows }) => (
  <Grid container>
    {
      episodes.length ?
        episodes.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={`${item.id}-${index}`}>
              <Episode
                shows={shows}
                item={item}
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
