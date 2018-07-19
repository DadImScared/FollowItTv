
import axios from 'axios';
import Cookies from 'js-cookie';
import { LOG_IN, LOG_OUT } from '../actiontypes/users';


export const registerUser = async (payload) => {
  return await axios.post('/api/v1/register/', payload);
};

export const reSendEmailConfirm = async (email) => {
  return await axios.post('/resend_email', { email });
};

export const postLogIn = async (payload) => {
  return await axios.post('/api/v1/login/', payload);
};

export const logIn = () => {
  return {
    type: LOG_IN
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    Cookies.remove('token');
    dispatch(logOut());
  };
};

export const logInUser = (payload) => {
  return async (dispatch) => {
    try {
      const { data: { key } } = await postLogIn(payload);
      dispatch(logIn());
      Cookies.set('token', key);
    }
    catch (e) {
      throw e;
    }
  };
};
