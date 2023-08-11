import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
// import {createBlacklistFilter} from 'redux-persist-transform-filter';
import loginReducer from '../modules/login/slice';
import verificationCodeReducer from '../modules/verificationCode/slice';

export const LOG_OUT = 'LOG_OUT';

export const STORAGE_KEY = 'strangerchat';

const persistConfig = {
  key: STORAGE_KEY,
  storage: AsyncStorage,
  // whitelist: ['user'],
  // transforms: [createBlacklistFilter('user', ['scene', 'error', 'status'])],
};

const appReducer = combineReducers({
  login: loginReducer,
  verificationCode: verificationCodeReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOG_OUT) {
    AsyncStorage.removeItem(STORAGE_KEY).then(() => {});
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
