
import Cookies from 'js-cookie';

import { LOG_IN, LOG_OUT } from '../actiontypes/users';


const initialState = {
  loggedIn: Cookies.get('token') !== undefined,
  token: Cookies.get('token')
};

function users(state=initialState, action) {
  switch(action.type) {
  case LOG_IN:
    return {
      loggedIn: true,
      token: action.token
    };
  case LOG_OUT:
    return {
      loggedIn: false,
      token: ''
    };
  default:
    return state;
  }
}

export default users;
