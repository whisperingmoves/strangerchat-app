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
import {likeOrUnlikePost, sharePost} from './api';
import {State as UserState} from '../user/slice';
import {RootState} from '../store';

export type PostId = string;

export type Content = string;

export type Error = string;

export type Scene = 'like' | 'share';

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export interface State {
  operationPostId?: PostId;
  scene?: Scene;
  error: Error;
  status: Status;
}

const initialState: State = {
  error: '',
  status: 'idle',
};

export const likeOrUnlikePostAsync = createAsyncThunk<
  void,
  number,
  {state: {post: State; user: UserState}}
>('post/likeOrUnlikePost', async (action, {getState}) => {
  const {token} = getState().user;
  const {operationPostId: postId} = getState().post;

  return await likeOrUnlikePost({postId: postId as PostId, action}, token);
});

export const sharePostAsync = createAsyncThunk<
  void,
  void,
  {state: {post: State; user: UserState}}
>('post/sharePost', async (_, {getState}) => {
  const {token} = getState().user;
  const {operationPostId: postId} = getState().post;

  return await sharePost({postId: postId as PostId}, token);
});

export const slice = createSlice({
  name: 'post',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },

    setOperationPostId: (state, action: PayloadAction<PostId>) => {
      state.operationPostId = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(likeOrUnlikePostAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(likeOrUnlikePostAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(likeOrUnlikePostAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(sharePostAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(sharePostAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(sharePostAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setOperationPostId, setScene} = slice.actions;

export const status = (state: RootState) => state.post.status;

export const scene = (state: RootState) => state.post.scene;

export const operationPostId = (state: RootState) => state.post.operationPostId;

export default slice.reducer;
