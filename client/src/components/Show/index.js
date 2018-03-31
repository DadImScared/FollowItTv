
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addShow, getShow } from '../../actions/shows';
import View from './View';


export class Show extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      currentTab: 0
    };
  }

  async componentDidMount() {
    const { shows, addShow } = this.props;
    const showId = this.getShowId(this.props);
    if (shows[showId]) {
      return;
    }
    try {
      const { data } = await getShow(showId);
      addShow(data.id, { ...data });
    }
    catch ({ response: { data, status } }) {
      console.log(status, data);
    }
  }

  getShowId = (props) => {
    return props.match.params.showId;
  };

  handleChange = (event, value) => {
    this.setState({ currentTab: value });
  };

  handleChangeIndex = (value) => {
    this.setState({ currentTab: value });
  };

  render() {
    const { shows, ...other } = this.props;
    const showId = this.getShowId(this.props);
    return (
      <View
        {...other}
        {...this.state}
        show={shows[showId] || {}}
        handleChange={this.handleChange}
        handleChangeIndex={this.handleChangeIndex}
      />
    );
  }
}

const mapStateToProps = ({ shows }) => ({
  shows
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addShow
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
