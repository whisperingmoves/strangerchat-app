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
