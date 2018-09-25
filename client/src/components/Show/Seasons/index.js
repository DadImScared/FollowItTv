
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addSeasons, getSeasons, addSeasonEpisodes } from '../../../actions/seasons';
import { addEpisodes } from '../../../actions/episodes';
import View from './View';


export class Seasons extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      expanded: false
    };
  }

  componentDidMount() {
    if (this.props.show.id) {
      this.shouldGetSeasons(this.props.show.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { show: oldShow } = this.props;
    const { show } = nextProps;
    if (show !== oldShow) {
      this.shouldGetSeasons(show.id);
    }
  }

  changePanel = (expanded, panel) => {
    this.setState({
      expanded: expanded ? panel:false
    });
  };

  shouldGetSeasons = async (showId) => {
    const { byId, addSeasons } = this.props;
    if (!byId[showId]) {
      const { data } = await getSeasons(showId);
      addSeasons(showId, data);
    }
  };

  render() {
    const { show = {}, byId, ...other } = this.props;
    return (
      <View {...this.state} {...other} show={show} changePanel={this.changePanel} seasons={byId[show && show.id] || {}} />
    );
  }
}

const mapStateToProps = ({ seasons: { byId } }) => ({
  byId
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addSeasons,
    addEpisodes,
    addSeasonEpisodes
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Seasons);
