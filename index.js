import React from 'react';
import {AppRegistry, Platform, UIManager} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import {monitorError} from './src/stores/monitor/api';
import ErrorBoundary from './src/components/ErrorBoundary';
import {persistor, store} from './src/stores/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

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

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ActionSheetProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ActionSheetProvider>
    </PersistGate>
  </Provider>
));
