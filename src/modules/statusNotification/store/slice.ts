import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {
  GetStatusNotificationsRequest,
  StatusNotificationData,
} from '../../../apis/notification/getStatusNotifications';
import {State as UserState} from '../../../stores/user/slice';
import {listPageReducer} from '../../../stores/helper';
import {getStatusNotifications, markStatusNotificationAsRead} from './api';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export type Scene = 'getStatusNotifications' | 'markStatusNotificationAsRead';

export type ReadStatus = number;

export interface State extends GetStatusNotificationsRequest {
  list: StatusNotificationData[];
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

export const getStatusNotificationsAsync = createAsyncThunk<
  StatusNotificationData[],
  void,
  {state: {statusNotification: State; user: UserState}}
>('statusNotification/getStatusNotifications', async (_, {getState}) => {
  const {token} = getState().user;
  const {page, pageSize} = getState().statusNotification;

  return await getStatusNotifications({page, pageSize}, token);
});

export const markStatusNotificationAsReadAsync = createAsyncThunk<
  void,
  string,
  {state: {user: UserState}}
>(
  'statusNotification/markStatusNotificationAsRead',
  async (notificationId, {getState}) => {
    const {token} = getState().user;

    return await markStatusNotificationAsRead(notificationId, token);
  },
);

export const slice = createSlice({
  name: 'statusNotification',

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
      .addCase(getStatusNotificationsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getStatusNotificationsAsync.fulfilled, listPageReducer)

      .addCase(getStatusNotificationsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(markStatusNotificationAsReadAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(markStatusNotificationAsReadAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(markStatusNotificationAsReadAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, resetPage, setScene} = slice.actions;

export const status = (state: RootState) => state.statusNotification.status;

export const list = (state: RootState) => state.statusNotification.list;

export const scene = (state: RootState) => state.statusNotification.scene;

export default slice.reducer;
