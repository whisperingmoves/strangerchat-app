import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {HotPost} from '../../../apis/post/getHotPosts';
import {State as UserState} from '../../../stores/user/slice';
import {getHotPosts} from './api';
import {RootState} from '../../../stores/store';
import {
  GetLatestPostsRequest,
  LatestPostData,
} from '../../../apis/post/getLatestPosts';
import {listPageReducer} from '../../../stores/helper';
import {getLatestPosts} from '../../latest/store/api';

export type Error = string;

export type Scene = 'getHotPosts' | 'getLatestPosts' | undefined;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export interface State extends GetLatestPostsRequest {
  latestPostList: LatestPostData[];
  hotPostList: HotPost[];
  error: Error;
  scene: Scene;
  status: Status;
}

const initialState: State = {
  latestPostList: [],
  hotPostList: [],
  page: 1,
  pageSize: 10,
  error: '',
  scene: undefined,
  status: 'idle',
};

export const getHotPostsAsync = createAsyncThunk<
  HotPost[],
  void,
  {state: {search: State; user: UserState}}
>('search/getHotPosts', async (_, {getState}) => {
  const {token} = getState().user;

  return await getHotPosts(token);
});

export const getLatestPostsAsync = createAsyncThunk<
  LatestPostData[],
  void,
  {state: {search: State; user: UserState}}
>('search/getLatestPosts', async (_, {getState}) => {
  const {page, pageSize} = getState().search;
  const {token} = getState().user;

  return await getLatestPosts({page, pageSize}, token);
});

export const slice = createSlice({
  name: 'search',

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
      .addCase(getHotPostsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getHotPostsAsync.fulfilled, (state, action) => {
        state.hotPostList = action.payload;

        state.status = 'success';
      })

      .addCase(getHotPostsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

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

export const {resetStatus, resetPage, setScene} = slice.actions;

export const status = (state: RootState) => state.search.status;

export const scene = (state: RootState) => state.search.scene;

export const hotPostList = (state: RootState) => state.search.hotPostList;

export const latestPostList = (state: RootState) => state.search.latestPostList;

export default slice.reducer;
