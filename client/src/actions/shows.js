
import * as showActionTypes from '../actiontypes/shows';

export const addShow = (id, payload) => {
  return {
    type: showActionTypes.ADD_SHOW,
    id,
    payload
  };
};
