
import React from 'react';

export default [
  (show) => (
    <span>network: <a href={show.officialSite}>{show.network && show.network.name}</a></span>
  ),
  (show) => (`status: ${show.status || ''}`),
  (show) => (`air days: ${show.schedule && show.schedule.days.join(', ')}`),
  (show) => (`air time: ${show.schedule && show.schedule.time}`),
  (show) => (`premiered: ${show.premiered || ''}`),
  (show) => (`genres: ${show.genres && show.genres.join(', ')}`)
];
