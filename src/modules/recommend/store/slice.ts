import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {getRecommendedPosts} from './api';
import {State as UserState} from '../../../stores/user/slice';
import {listPageReducer} from '../../../stores/helper';
import {
  GetRecommendedPostsRequest,
  RecommendedPostData,
} from '../../../apis/post/getRecommendedPosts';
import {getLocation} from '../../../utils/geolocation';

export type IsFollowed = number;

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export interface State {
  list: RecommendedPostData[];
  page?: number;
  pageSize?: number;
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

export const getRecommendedPostsAsync = createAsyncThunk<
  RecommendedPostData[],
  void,
  {state: {recommend: State; user: UserState}}
>('recommend/getRecommendedPosts', async (_, {getState}) => {
  const {page, pageSize} = getState().recommend;
  const {token} = getState().user;

  const geoPosition = await getLocation();
  const request: GetRecommendedPostsRequest = {
    page,
    pageSize,
    longitude: geoPosition?.coords.longitude,
    latitude: geoPosition?.coords.latitude,
  };

  return await getRecommendedPosts(request, token);
});

export const slice = createSlice({
  name: 'recommend',

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
      .addCase(getRecommendedPostsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getRecommendedPostsAsync.fulfilled, listPageReducer)

      .addCase(getRecommendedPostsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, resetPage} = slice.actions;

export const status = (state: RootState) => state.recommend.status;

export const list = (state: RootState) => state.recommend.list;

export default slice.reducer;
