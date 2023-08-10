/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import Config from 'react-native-config';
import App from './App';
import {name as appName} from './app.json';
import {monitorError} from './src/stores/monitor/api';
import ErrorBoundary from './src/components/ErrorBoundary';

console.log(Config);

// 普通 JavaScript 报错的收集
const defaultHandler =
  ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler();
ErrorUtils.setGlobalHandler((error, isFatal) => {
  monitorError(error).then();
  defaultHandler(error, isFatal);
});

// 未被捕获的 Promise 报错的收集
const customRejectionTrackingOptions = {
  allRejections: true,
  onUnhandled: (id, error) => {
    monitorError(error).then();
  },
  onHandled: id => {},
};
if (global?.HermesInternal?.hasPromise?.()) {
  if (__DEV__) {
    global.HermesInternal?.enablePromiseRejectionTracker?.(
      customRejectionTrackingOptions,
    );
  }
} else {
  if (__DEV__) {
    require('promise/setimmediate/rejection-tracking').enable(
      customRejectionTrackingOptions,
    );
  }
}

AppRegistry.registerComponent(appName, () => () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
));
