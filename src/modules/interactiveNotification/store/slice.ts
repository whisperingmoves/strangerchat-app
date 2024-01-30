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
  GetInteractionNotificationsRequest,
  InteractionNotificationData,
} from '../../../apis/notification/getInteractionNotifications';
import {State as UserState} from '../../../stores/user/slice';
import {listPageReducer} from '../../../stores/helper';
import {
  getInteractionNotifications,
  markInteractionNotificationAsRead,
} from './api';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type Scene =
  | 'getInteractionNotifications'
  | 'markInteractionNotificationAsRead';

export type ReadStatus = number;

export interface State extends GetInteractionNotificationsRequest {
  list: InteractionNotificationData[];
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

export const getInteractionNotificationsAsync = createAsyncThunk<
  InteractionNotificationData[],
  void,
  {state: {interactiveNotification: State; user: UserState}}
>(
  'interactiveNotification/getInteractionNotifications',
  async (_, {getState}) => {
    const {token} = getState().user;
    const {page, pageSize} = getState().interactiveNotification;

    return await getInteractionNotifications({page, pageSize}, token);
  },
);

export const markInteractionNotificationAsReadAsync = createAsyncThunk<
  void,
  string,
  {state: {user: UserState}}
>(
  'interactiveNotification/markInteractionNotificationAsRead',
  async (notificationId, {getState}) => {
    const {token} = getState().user;

    return await markInteractionNotificationAsRead(notificationId, token);
  },
);

export const slice = createSlice({
  name: 'interactiveNotification',

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
      .addCase(getInteractionNotificationsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getInteractionNotificationsAsync.fulfilled, listPageReducer)

      .addCase(getInteractionNotificationsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(markInteractionNotificationAsReadAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(markInteractionNotificationAsReadAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(
        markInteractionNotificationAsReadAsync.rejected,
        (state, action) => {
          state.status = 'failed';

          state.error = action.error.message || '';
        },
      );
  },
});

export const {resetStatus, resetPage, setScene} = slice.actions;

export const status = (state: RootState) =>
  state.interactiveNotification.status;

export const list = (state: RootState) => state.interactiveNotification.list;

export const scene = (state: RootState) => state.interactiveNotification.scene;

export default slice.reducer;
