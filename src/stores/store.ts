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

import {combineReducers, configureStore} from '@reduxjs/toolkit';
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
import loginReducer from '../modules/login/store/slice';
import verificationCodeReducer from '../modules/verificationCode/store/slice';
import genderReducer from '../modules/gender/store/slice';
import birthdayReducer from '../modules/birthday/store/slice';
import avatarReducer from '../modules/avatar/store/slice';
import userReducer from '../stores/user/slice';
import postReducer from '../stores/post/slice';
import navigationBarReducer from '../modules/navigationBar/store/slice';
import homeReducer from '../modules/home/store/slice';
import newPostReducer from '../modules/newPost/store/slice';
import followingReducer from '../modules/following/store/slice';
import recommendReducer from '../modules/recommend/store/slice';
import latestReducer from '../modules/latest/store/slice';
import searchReducer from '../modules/search/store/slice';
import chatReducer from '../modules/chat/store/slice';
import chatDetailReducer from '../modules/chatDetail/store/slice';
import giftReducer from '../modules/gift/store/slice';
import topUpReducer from '../modules/topUp/store/slice';
import commentDetailReducer from '../modules/commentDetail/store/slice';
import walletReducer from '../modules/wallet/store/slice';
import myGiftReducer from '../modules/myGift/store/slice';
import followingUserReducer from '../modules/followingUser/store/slice';
import followerReducer from '../modules/follower/store/slice';
import closeFriendReducer from '../modules/closeFriend/store/slice';
import interactiveNotificationReducer from '../modules/interactiveNotification/store/slice';
import statusNotificationReducer from '../modules/statusNotification/store/slice';
import giftNotificationReducer from '../modules/giftNotification/store/slice';
import systemNotificationReducer from '../modules/systemNotification/store/slice';
import profileReducer from '../modules/profile/store/slice';
import {socket} from '../apis/socket';

export const LOG_OUT = 'LOG_OUT';

export const STORAGE_KEY = 'strangerchat';

const persistConfig = {
  key: STORAGE_KEY,
  storage: AsyncStorage,
  whitelist: ['user', 'newPost', 'chat', 'chatDetail'],
};

const appReducer = combineReducers({
  login: loginReducer,
  verificationCode: verificationCodeReducer,
  gender: genderReducer,
  birthday: birthdayReducer,
  avatar: avatarReducer,
  user: userReducer,
  navigationBar: navigationBarReducer,
  home: homeReducer,
  newPost: newPostReducer,
  following: followingReducer,
  recommend: recommendReducer,
  latest: latestReducer,
  post: postReducer,
  search: searchReducer,
  chat: chatReducer,
  chatDetail: chatDetailReducer,
  gift: giftReducer,
  topUp: topUpReducer,
  commentDetail: commentDetailReducer,
  wallet: walletReducer,
  myGift: myGiftReducer,
  followingUser: followingUserReducer,
  follower: followerReducer,
  closeFriend: closeFriendReducer,
  interactiveNotification: interactiveNotificationReducer,
  statusNotification: statusNotificationReducer,
  giftNotification: giftNotificationReducer,
  systemNotification: systemNotificationReducer,
  profile: profileReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOG_OUT) {
    AsyncStorage.removeItem(STORAGE_KEY).then(() => {});

    socket.disconnect();
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
