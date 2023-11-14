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

export type Keyword = string;

export type Error = string;

export type Scene = 'getHotPosts' | 'getLatestPosts' | undefined;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export interface State extends GetLatestPostsRequest {
  list: LatestPostData[];
  hotPostList: HotPost[];
  keyword?: Keyword;
  error: Error;
  scene: Scene;
  status: Status;
}

const initialState: State = {
  list: [],
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
  const {page, pageSize, keyword} = getState().search;
  const {token} = getState().user;

  return await getLatestPosts({page, pageSize, keyword}, token);
});

export const slice = createSlice({
  name: 'search',

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

    setKeyword: (state, action: PayloadAction<Keyword>) => {
      state.keyword = action.payload;
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

export const {resetStatus, resetPage, setScene, setKeyword} = slice.actions;

export const status = (state: RootState) => state.search.status;

export const scene = (state: RootState) => state.search.scene;

export const keyword = (state: RootState) => state.search.keyword;

export const hotPostList = (state: RootState) => state.search.hotPostList;

export const list = (state: RootState) => state.search.list;

export default slice.reducer;
