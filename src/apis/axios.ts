// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
