
import axios from 'axios';
import _ from 'lodash';
import { normalize } from 'normalizr';

import { ADD_CREW } from '../actiontypes/crew';
import { loadingStart, loadingEnd } from './loading';
import { baseUrl } from './seasons';
import { crewSchema } from '../schemas/person';

export const addCrew = (entities) => ({
  type: ADD_CREW,
  ...entities
});

const getCrew = async (showId) => await axios.get(`${baseUrl}shows/${showId}/crew`);

export const handleCrewData = (data) => {
  const { entities, result } = normalize(data, crewSchema);
  const crewMembers = result.reduce((acc, crewMember) => {
    return {
      ...acc,
      [crewMember.person]: _.union(_.get(acc, crewMember.person, []), [ crewMember.type ])
    };
  }, {});
  return {
    ...entities,
    result,
    crewMembers
  };
};

export const requestCrew = (showId) => {
  return async (dispatch) => {
    const requestId = `GET_CREW_${showId}`;
    dispatch(loadingStart(requestId));
    try {
      const { data } = await getCrew(showId);
      const { person: people, crewMembers } = handleCrewData(data);
      dispatch(addCrew({ id: showId, people, crewMembers }));
      dispatch(loadingEnd(requestId));
    }
    catch(e) {
      dispatch(loadingEnd(requestId));
      throw e;
    }
  };
};
