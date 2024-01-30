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

import React from 'react';
import {AppRegistry, LogBox, Platform, UIManager} from 'react-native';
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
  // onHandled: id => {},
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

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

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
