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

  console.debug('monitorError', body);

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
