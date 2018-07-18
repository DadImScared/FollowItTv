
import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';

import { findFollowedShows } from '../../actions/followedShows';
import { makeFollowedShowData } from '../../reducers/followedShows';

import ShowListItem from './ShowListItem';
import Loading from '../Loading';

class ShowList extends Component {

  componentDidMount() {
    const { isLoading, getFollowedShows } = this.props;
    // only make api request if loading state has not been initialized
    // this is because any additional data after the load will come from the client when following/un following a show
    if (isLoading !== undefined) return;
    getFollowedShows();
  }

  render() {
    const { unFollow, isCached, isLoading, followedShows } = this.props;

    if (isLoading) return <Loading/>;
    if (!isCached) return <div>no results</div>;

    return (
      <List>
        {
          followedShows.map((show, index) => (
            <ShowListItem show={show} unFollow={unFollow} key={`${show.id}-${index}`} />
          ))
        }
      </List>
    );
  }
}

const makeMapStateToProps = () => {
  const getShows = makeFollowedShowData();
  return (state, props) => {
    return getShows(state, props);
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  getFollowedShows: () => dispatchProps.dispatch(findFollowedShows(ownProps.day))
});

export default connect(makeMapStateToProps, null, mergeProps)(ShowList);
