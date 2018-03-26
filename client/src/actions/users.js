
import axios from 'axios';


export const registerUser = async (payload) => {
  return await axios.post('/api/v1/register/', payload);
};

export const reSendEmailConfirm = async (email) => {
  return await axios.post('/resend_email', { email });
};
