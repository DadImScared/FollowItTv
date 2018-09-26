
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { getSeasonEpisodes, normalizeSeasonEpisodes } from '../../../actions/seasons';
import { makeSeasonEpisodes } from '../../../reducers/seasons';
import Episode from '../../Episode';
import styles from '../../../styles/Schedule.css';


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

  setMasonryRef = (el) => {
    if (el) {
      this.masonry = el.masonry;
    }
  };

  expandContentCb = () => {
    setTimeout(() => this.masonry.layout(), 275); // wait for close/open transition to finish before setting layout
  };

  render() {
    const { season, episodes, show, classes } = this.props;
    return (
      <div style={{ width: '100%' }}>
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
          <Divider />
        </div>
        <Masonry options={{ horizontalOrder: true }} ref={this.setMasonryRef}>
          {
            episodes.map((episode, index) => {
              return (
                <div style={{ zIndex: 500 - index }} className={classes.col} key={`${episode.id}-${index}`}>
                  <Episode handleExpandCb={this.expandContentCb} showActions={false} item={episode} show={show} />
                </div>
              );
            })
          }
        </Masonry>
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const getSeasonEpisodesData = makeSeasonEpisodes();
  return (state, props) => getSeasonEpisodesData(state, props);
};

export default connect(makeMapStateToProps)(withStyles(styles)(Season));
