
import axios from 'axios';
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

export const logIn = (token) => {
  return {
    type: LOG_IN,
    token
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT
  };
};
