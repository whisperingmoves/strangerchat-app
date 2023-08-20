import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {getFollowedPosts} from './api';
import {State as UserState} from '../../../stores/user/slice';
import {listPageReducer} from '../../../stores/helper';
import {
  FollowedPostData,
  GetFollowedPostsRequest,
} from '../../../apis/post/getFollowedPosts';
import {
  likeOrUnlikePost,
  LikePostRequest,
} from '../../../apis/post/likeOrUnlikePost';

export type PostId = string;

export type IsLiked = number;

export type ConversationId = string;

export type CreateTime = number;

export type AuthorName = string;

export type AuthorAvatar = string;

export type AuthorId = string;

export type City = string;

export type LikeCount = number;

export type CommentCount = number;

export type Error = string;

export type Scene = 'getFollowedPosts' | 'likeOrUnlikePost' | undefined;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export interface State extends GetFollowedPostsRequest {
  list: FollowedPostData[];
  error: Error;
  scene: Scene;
  status: Status;
}

const initialState: State = {
  list: [],
  page: 1,
  pageSize: 10,
  error: '',
  scene: undefined,
  status: 'idle',
};

export const getFollowedPostsAsync = createAsyncThunk<
  FollowedPostData[],
  void,
  {state: {following: State; user: UserState}}
>('following/getFollowedPosts', async (_, {getState}) => {
  const {page, pageSize} = getState().following;
  const {token} = getState().user;

  return await getFollowedPosts({page, pageSize}, token);
});

export const likeOrUnlikePostAsync = createAsyncThunk<
  void,
  LikePostRequest,
  {state: {following: State; user: UserState}}
>('following/likeOrUnlikePost', async (request, {getState}) => {
  const {token} = getState().user;

  return await likeOrUnlikePost(request, token);
});

export const slice = createSlice({
  name: 'following',

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
      .addCase(getFollowedPostsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getFollowedPostsAsync.fulfilled, listPageReducer)

      .addCase(getFollowedPostsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(likeOrUnlikePostAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(likeOrUnlikePostAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(likeOrUnlikePostAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, resetPage, setScene} = slice.actions;

export const status = (state: RootState) => state.following.status;

export const list = (state: RootState) => state.following.list;

export const scene = (state: RootState) => state.following.scene;

export default slice.reducer;
