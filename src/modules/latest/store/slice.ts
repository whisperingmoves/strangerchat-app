import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {State as UserState} from '../../../stores/user/slice';
import {
  GetLatestPostsRequest,
  LatestPostData,
} from '../../../apis/post/getLatestPosts';
import {getLatestPosts} from './api';
import {listPageReducer} from '../../../stores/helper';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export interface State extends GetLatestPostsRequest {
  list: LatestPostData[];
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

export const getLatestPostsAsync = createAsyncThunk<
  LatestPostData[],
  void,
  {state: {latest: State; user: UserState}}
>('latest/getLatestPosts', async (_, {getState}) => {
  const {page, pageSize} = getState().latest;
  const {token} = getState().user;

  return await getLatestPosts({page, pageSize}, token);
});

export const slice = createSlice({
  name: 'latest',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
    },

    resetPage: state => {
      state.page = initialState.page;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getLatestPostsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getLatestPostsAsync.fulfilled, listPageReducer)

      .addCase(getLatestPostsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, resetPage} = slice.actions;

export const status = (state: RootState) => state.latest.status;

export const list = (state: RootState) => state.latest.list;

export default slice.reducer;
