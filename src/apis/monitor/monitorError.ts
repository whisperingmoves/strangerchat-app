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
