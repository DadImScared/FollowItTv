
import React from 'react';

export default [
  (show) => (
    <a href={show.officialSite}>network {show.network && show.network.name}</a>
  ),
  (show) => (`status ${show.status || ''}`),
  (show) => (`air days ${show.schedule && show.schedule.days.join(', ')}`),
  (show) => (`air time ${show.schedule && show.schedule.time}`),
  (show) => (`premiered ${show.premiered || ''}`),
  (show) => (`genres ${show.genres && show.genres.join(', ')}`)
];
