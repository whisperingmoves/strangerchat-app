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

import Config from 'react-native-config';

import {AxiosHeaders} from 'axios';

import axiosInstance from '../axios';

export interface MonitorErrorRequest {
  projectName: string;
  errorMessage: string;
  stackTrace: string;
  appVersion?: string;
  ipAddress?: string;
  runtimeName?: string;
  runtimeVersion?: string;
  appStartTime?: Date;
  appMemory?: number;
  browserName?: string;
  browserVersion?: string;
  locale?: string;
  timezone?: string;
  operatingSystemName?: string;
  operatingSystemVersion?: string;
  occurredFile?: string;
  occurredLine?: number;
  occurredFunction?: string;
}

export const monitorError = async (
  request: MonitorErrorRequest,
): Promise<void> => {
  try {
    await axiosInstance.post('/monitor/error', request, {
      headers: new AxiosHeaders({
        Authorization: `Bearer ${Config.MONITOR_TOKEN}`,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};
