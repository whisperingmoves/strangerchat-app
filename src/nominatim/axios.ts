import axios from 'axios';
import Config from 'react-native-config';

const axiosInstance = axios.create({
  baseURL: Config.NOMINATIM_BASE_URL,
  timeout: parseInt(<string>Config.TIME_OUT, 10),
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.data.hasOwnProperty('error')) {
      return Promise.reject(new Error(response.data.error));
    }

    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
