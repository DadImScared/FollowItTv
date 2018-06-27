
import { UPDATE_SCROLL } from '../actiontypes/scroll';

const initialState = {
  directionDown: false,
  bottomOfPage: false
};

function scroll(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SCROLL:
      return {
        ...state,
        ...action.scrollData
      };
    default:
      return state;
  }
}

export default scroll;
