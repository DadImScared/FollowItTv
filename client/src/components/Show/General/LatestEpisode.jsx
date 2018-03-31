
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { addEpisodes, getEpisode } from '../../../actions/episodes';


export class LatestEpisode extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      episodeId: null,
      nextEpisode: false
    };
  }

  async componentDidMount() {
    const { nextepisode, previousepisode, addEpisodes, episodes } = this.props;
    const currentEpisode = nextepisode || previousepisode;
    const nextEpisode = !!nextepisode;
    const episodeId = this.getEpisodeIdFromUrl(currentEpisode.href);
    this.setState({ episodeId, nextEpisode });
    if (!episodes[episodeId]) {
      const { data } = await getEpisode(episodeId);
      addEpisodes({
        [data.id]: {
          ...data
        }
      });
    }
  }

  getEpisodeIdFromUrl = (url) => {
    return url.split('/').pop();
  };

  render() {
    const { episodeId, nextEpisode } = this.state;
    const { episodes } = this.props;
    const { name, airtime, airdate, summary }  = episodes[episodeId] || {};
    return (
      <Paper style={{ height: '150px', marginTop: '16px', padding: '8px' }}>
        <Typography align={'center'}>
          {
            nextEpisode ?
              'Next episode':'Previous episode'
          }
        </Typography>
        <div>
          <Typography>
            {`name ${name}`}
          </Typography>
          <Typography>
            {`date ${airdate} ${airtime}`}
          </Typography>
        </div>
        <Typography>
          {summary}
        </Typography>
      </Paper>
    );
  }
}

const mapStateToProps = ({ episodes }) => ({
  episodes
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addEpisodes
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestEpisode);
