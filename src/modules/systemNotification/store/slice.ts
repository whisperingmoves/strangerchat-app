import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {
  GetSystemNotificationsRequest,
  SystemNotificationData,
} from '../../../apis/notification/getSystemNotifications';
import {getSystemNotifications, markSystemNotificationAsRead} from './api';
import {State as UserState} from '../../../stores/user/slice';
import {listPageReducer} from '../../../stores/helper';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export type Scene = 'getSystemNotifications' | 'markSystemNotificationAsRead';

export type ReadStatus = number;

export type NotificationType = number;

export interface State extends GetSystemNotificationsRequest {
  list: SystemNotificationData[];
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

export const getSystemNotificationsAsync = createAsyncThunk<
  SystemNotificationData[],
  void,
  {state: {systemNotification: State; user: UserState}}
>('systemNotification/getSystemNotifications', async (_, {getState}) => {
  const {token} = getState().user;
  const {page, pageSize} = getState().systemNotification;

  return await getSystemNotifications({page, pageSize}, token);
});

export const markSystemNotificationAsReadAsync = createAsyncThunk<
  void,
  string,
  {state: {user: UserState}}
>(
  'systemNotification/markSystemNotificationAsRead',
  async (notificationId, {getState}) => {
    const {token} = getState().user;

    return await markSystemNotificationAsRead(notificationId, token);
  },
);

export const slice = createSlice({
  name: 'systemNotification',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
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
      .addCase(getSystemNotificationsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getSystemNotificationsAsync.fulfilled, listPageReducer)

      .addCase(getSystemNotificationsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(markSystemNotificationAsReadAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(markSystemNotificationAsReadAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(markSystemNotificationAsReadAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, resetPage, setScene} = slice.actions;

export const status = (state: RootState) => state.systemNotification.status;

export const list = (state: RootState) => state.systemNotification.list;

export const scene = (state: RootState) => state.systemNotification.scene;

export default slice.reducer;
