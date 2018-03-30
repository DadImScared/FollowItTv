
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import Heart from 'mdi-material-ui/Heart';
import HeartBroken from 'mdi-material-ui/HeartBroken';

import * as followShowActions from '../actions/followedShows';
import { addShow, getShow } from '../actions/shows';
import styles from '../styles/FollowShowButton.css';


export class FollowShowButton extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isLoading: false
    };
  }

  handleClick = async () => {
    const { followedShows, showId, shows, followShow, unfollowShow } = this.props;
    if (this.state.isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    if (!shows[showId]) {
      const show = await this.getAndUpdateShows(showId);
      shows[show.id] = show;
    }
    // follow or unfollow show
    const { schedule: { days } } = shows[showId];
    try {
      await followShowActions.postFollow(showId);
      if (followedShows.includes(showId)) {
        unfollowShow(days, showId);
      }
      else {
        followShow(days, showId);
      }
    }
    catch ({ response: { data, status } }) {
      console.log(status, data);
    }
    this.setState({ isLoading: false });
  };

  getAndUpdateShows = async (showId) => {
    try {
      const { data } = await getShow(showId);
      addShow(data.id, data);
      return data;
    }
    catch ({ response: { data, status } }) {
      console.log(data, status);
    }
  };

  render() {
    const { followedShows, showId, classes } = this.props;
    return (
      <Button onClick={this.handleClick}>
        <span className={classes.heartIcon}>
          { followedShows.includes(showId) ? <HeartBroken />:<Heart /> }
        </span>
        { followedShows.includes(showId) ? 'Un follow':'Follow'}
      </Button>
    );
  }
}

const mapStateToProps = ({ shows, followedShowsById }) => ({
  shows,
  followedShows: followedShowsById
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    followShow: followShowActions.followShow,
    unfollowShow: followShowActions.unfollowShow,
    addShow
  }, dispatch);
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FollowShowButton));
