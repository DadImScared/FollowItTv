import _ from 'lodash';
import moment from 'moment/moment';

export const organizeTodayShows = (state, props) => {
  const willAir = new Set();
  const hasAired = new Set();
  const isAiring = [];
  const { schedule , episodes } = props;
  const { today } = state;
  const now = moment();
  schedule[today].forEach((episodeId) => {
    const { airtime: time, airdate: date, runtime } = episodes[episodeId];
    const showDate = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
    if (now.diff(showDate) < 0) {
      willAir.add(episodeId);
    }
    else if (now.diff(showDate.clone().add(runtime, 'minutes')) > 0 ) {
      hasAired.add(episodeId);
    }
    else {
      isAiring.push(episodeId);
    }
  });
  return {
    willAir: [...willAir],
    currentlyAiring: _.union(state.currentlyAiring, isAiring),
    hasAired: [...hasAired]
  };
};

export const getYesterdayIsAiring = (state, props) => {
  const { episodes, schedule } = props;
  const now = moment();
  const yesterday = now.clone().subtract(1, 'days').format('YYYY-MM-DD');
  const yesterdayisAiring = [];
  schedule[yesterday].forEach((episodeId) => {
    const { airtime: time, airdate: date, runtime } = episodes[episodeId];
    const showDate = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
    if (now.diff(showDate) < 0 || now.diff(showDate.clone().add(runtime, 'minutes')) > 0) {
      return;
    }
    yesterdayisAiring.push(episodeId);
  });
  return {
    currentlyAiring: _.union([...state.currentlyAiring, ...yesterdayisAiring])
  };
};
