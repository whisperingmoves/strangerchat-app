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

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {
  GetGiftNotificationsRequest,
  GiftNotificationData,
} from '../../../apis/notification/getGiftNotifications';
import {State as UserState} from '../../../stores/user/slice';
import {getGiftNotifications, markGiftNotificationAsRead} from './api';
import {listPageReducer} from '../../../stores/helper';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type Scene = 'getGiftNotifications' | 'markGiftNotificationAsRead';

export type ReadStatus = number;

export interface State extends GetGiftNotificationsRequest {
  list: GiftNotificationData[];
  scene?: Scene;
  error: Error;
  status: Status;
}

const initialState: State = {
  list: [],
  page: 1,
  pageSize: 10,
  error: '',
  status: 'idle',
};

export const getGiftNotificationsAsync = createAsyncThunk<
  GiftNotificationData[],
  void,
  {state: {giftNotification: State; user: UserState}}
>('giftNotification/getGiftNotifications', async (_, {getState}) => {
  const {token} = getState().user;
  const {page, pageSize} = getState().giftNotification;

  return await getGiftNotifications({page, pageSize}, token);
});

export const markGiftNotificationAsReadAsync = createAsyncThunk<
  void,
  string,
  {state: {user: UserState}}
>(
  'giftNotification/markGiftNotificationAsRead',
  async (notificationId, {getState}) => {
    const {token} = getState().user;

    return await markGiftNotificationAsRead(notificationId, token);
  },
);

export const slice = createSlice({
  name: 'giftNotification',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    resetPage: state => {
      state.page = initialState.page;
    },

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getGiftNotificationsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getGiftNotificationsAsync.fulfilled, listPageReducer)

      .addCase(getGiftNotificationsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(markGiftNotificationAsReadAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(markGiftNotificationAsReadAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(markGiftNotificationAsReadAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, resetPage, setScene} = slice.actions;

export const status = (state: RootState) => state.giftNotification.status;

export const list = (state: RootState) => state.giftNotification.list;

export const scene = (state: RootState) => state.giftNotification.scene;

export default slice.reducer;
