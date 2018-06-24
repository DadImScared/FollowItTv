
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { addEpisodes, getEpisode } from '../../../actions/episodes';
import Countdown from '../../Countdown';
import Summary from '../../Summary';


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
      <Paper style={{ height: '150px', margin: '16px 0', padding: '8px' }}>
        <Typography component={'div'} align={'center'}>
          {
            nextEpisode ?
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <span style={{ marginRight: '5px' }}>Next episode</span>
                {
                  airtime ?
                    <Countdown eventTime={moment(`${airdate} ${airtime}`, 'YYYY-MM-DD HH:mm')} />
                    :
                    null
                }
              </span>:'Previous episode'
          }
        </Typography>
        <div>
          <Typography>
            {`name: ${name}`}
          </Typography>
          {
            !nextEpisode ?
              <Typography>
                <span>{`date: ${airdate} ${airtime}`}</span>
              </Typography>
              :
              null
          }
        </div>
        <Typography component={'div'}>
          <Summary summary={summary} />
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
