
import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { getSeasonEpisodes, normalizeSeasonEpisodes } from '../../../actions/seasons';
import Episode from '../../Episode';


export class Season extends Component {

  async componentDidMount() {
    const { season: { id }, seasonEpisodes, addSeasonEpisodes, addEpisodes, showId } = this.props;
    if (seasonEpisodes[id]) {
      return;
    }
    try {
      const { data } = await getSeasonEpisodes(id);
      const { episodeList, newEpisodes } = normalizeSeasonEpisodes(showId, data);
      addEpisodes(newEpisodes);
      addSeasonEpisodes(id, episodeList);
    }
    catch (e) {
      console.log(e);
    }
  }

  render() {
    const { season, seasonEpisodes, episodes, show } = this.props;
    const fullEpisodes = seasonEpisodes[season.id] || [];
    return (
      <div>
        <div style={{ marginBottom: '8px' }}>
          <div>
            <Typography gutterBottom>
              episodes: {season.episodeOrder}
            </Typography>
          </div>
          <Typography gutterBottom>
            {
              season.summary ?
                <span>summary: {season.summary}</span>
                :
                'No summary'
            }
          </Typography>
          <Divider/>
        </div>
        <Grid container>
          {
            fullEpisodes.map((episodeId, index) => {
              const episode = episodes[episodeId] || {};
              return (
                <Grid item xs={12} lg={6} xl={4} style={{ marginBottom: '5px' }} key={`${episodeId}-${index}`}>
                  <Episode showActions={false} item={episode} show={show} />
                </Grid>
              );
            })
          }
        </Grid>
      </div>
    );
  }
}

export default Season;
