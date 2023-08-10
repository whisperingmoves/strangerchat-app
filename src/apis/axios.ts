import axios from 'axios';
import Config from 'react-native-config';

import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
} from '../constants/api/Config';

const axiosInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: parseInt(<string>Config.TIME_OUT, 10),
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const {response} = error;
    if (response) {
      const {status, headers} = response;
      if (status === 500) {
        error.message = INTERNAL_SERVER_ERROR;
      } else if (status === 429) {
        const retryAfter = headers['retry-after'] || '60';
        error.message = TOO_MANY_REQUESTS(retryAfter);
      } else if (status === 404) {
        error.message = NOT_FOUND;
      } else if (status === 403) {
        error.message = FORBIDDEN;
      } else if (status === 400) {
        error.message = BAD_REQUEST;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
