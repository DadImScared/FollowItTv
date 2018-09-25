
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { getSeasonEpisodes, normalizeSeasonEpisodes } from '../../../actions/seasons';
import { makeSeasonEpisodes } from '../../../reducers/seasons';
import Episode from '../../Episode';


export class Season extends Component {

  async componentDidMount() {
    const { season: { id }, hasData, addSeasonEpisodes, addEpisodes, showId } = this.props;
    if (hasData) {
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
    const { season, episodes, show } = this.props;
    // const fullEpisodes = seasonEpisodes[season.id] || [];
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
            episodes.map((episode, index) => {
              // const episode = episodes[episodeId] || {};
              return (
                <Grid item xs={12} lg={6} xl={4} style={{ marginBottom: '5px' }} key={`${episode.id}-${index}`}>
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

const makeMapStateToProps = () => {
  const getSeasonEpisodesData = makeSeasonEpisodes();
  return (state, props) => {
    const results = getSeasonEpisodesData(state, props);
    console.log(getSeasonEpisodesData.recomputations());
    return results;
  };
};

export default connect(makeMapStateToProps)(Season);
