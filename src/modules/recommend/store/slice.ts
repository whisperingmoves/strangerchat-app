import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {getRecommendedPosts} from './api';
import {State as UserState} from '../../../stores/user/slice';
import {listPageReducer} from '../../../stores/helper';
import {
  GetRecommendedPostsRequest,
  RecommendedPostData,
} from '../../../apis/post/getRecommendedPosts';
import {GeoPosition} from 'react-native-geolocation-service';
import {getLocation} from '../../../utils/geolocation';

export type IsFollowed = number;

export type Error = string;

export type Scene = 'getRecommendedPosts' | 'getLocation' | undefined;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export interface State extends GetRecommendedPostsRequest {
  list: RecommendedPostData[];
  error: Error;
  scene?: Scene;
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

  return await getRecommendedPosts({page, pageSize}, token);
});

export const getLocationAsync = createAsyncThunk<GeoPosition | undefined, void>(
  'recommend/getLocation',
  async () => {
    return await getLocation();
  },
);

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

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
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
      })

      .addCase(getLocationAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getLocationAsync.fulfilled, (state, action) => {
        state.status = 'success';

        state.longitude = action.payload?.coords.longitude;

        state.latitude = action.payload?.coords.latitude;
      })

      .addCase(getLocationAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, resetPage, setScene} = slice.actions;

export const status = (state: RootState) => state.recommend.status;

export const scene = (state: RootState) => state.recommend.scene;

export const list = (state: RootState) => state.recommend.list;

export default slice.reducer;
