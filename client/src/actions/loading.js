
import { LOADING_START, LOADING_END } from '../actiontypes/loading';

export const loadingStart = (requestId) => {
  return {
    type: LOADING_START,
    requestId
  };
};

export const loadingEnd = (requestId) => {
  return {
    type: LOADING_END,
    requestId
  };
};
