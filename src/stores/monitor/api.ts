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

import {Platform} from 'react-native';
import {getLocales} from 'react-native-localize';
import {NetworkInfo} from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';
import Moment from 'moment-timezone';

import {
  monitorError as monitorErrorApi,
  MonitorErrorRequest,
} from '../../apis/monitor/monitorError';
import packageInfo from '../../../package.json';

const appStartTime = new Date();

export const monitorError = async (error: Error) => {
  const body: MonitorErrorRequest = {
    projectName: DeviceInfo.getApplicationName() || 'N/A',
    errorMessage: error.message,
    stackTrace: error.stack || 'N/A',
    appVersion: packageInfo.version,
    ipAddress: (await NetworkInfo.getIPAddress()) || 'N/A',
    runtimeName: 'React Native',
    runtimeVersion: packageInfo.dependencies['react-native'],
    appStartTime,
    appMemory: parseFloat(
      ((await DeviceInfo.getUsedMemory()) / (1024 * 1024)).toFixed(2),
    ),
    browserName: 'N/A',
    browserVersion: 'N/A',
    locale: getCurrentLocale(),
    timezone: Moment.tz.guess() || 'N/A',
    operatingSystemName: Platform.OS,
    operatingSystemVersion: Platform.Version.toString(),
    occurredFile: getOccurredFile(error),
    occurredLine: getOccurredLine(error),
    occurredFunction: getOccurredFunction(error),
  };

  return await monitorErrorApi(body);
};

function getCurrentLocale(): string {
  const locales = getLocales();
  return locales[0].countryCode || locales[0].languageCode || 'N/A';
}

function getOccurredFile(error: Error): string {
  const fileRegex = /at .+ \((.*):\d+:\d+\)/;
  const match = error.stack?.match(fileRegex);
  if (match && match.length > 1) {
    return match[1];
  }
  return 'N/A';
}

function getOccurredLine(error: Error): number {
  const lineRegex = /at .+ \(.+:(\d+):\d+\)/;
  const match = error.stack?.match(lineRegex);
  if (match && match.length > 1) {
    return parseInt(match[1], 10);
  }
  return 0;
}

function getOccurredFunction(error: Error): string {
  const funcRegex = /at (\S+) \(/;
  const match = error.stack?.match(funcRegex);
  if (match && match.length > 1) {
    return match[1];
  }
  return 'N/A';
}
