
import Cookies from 'js-cookie';

import { LOG_IN, LOG_OUT } from '../actiontypes/users';


const initialState = {
  loggedIn: Cookies.get('token') !== undefined
};

function users(state=initialState, action) {
  switch(action.type) {
    case LOG_IN:
      return {
        loggedIn: true
      };
    case LOG_OUT:
      return {
        loggedIn: false
      };
    default:
      return state;
  }
}

export default users;
