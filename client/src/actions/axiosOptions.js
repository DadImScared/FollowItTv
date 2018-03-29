
import Cookies from 'js-cookie';

export default () => (
  {
    headers: {
      Authorization: `Token ${Cookies.get('token', '')}`
    }
  }
);
