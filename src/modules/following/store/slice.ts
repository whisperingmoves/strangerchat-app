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
import {getFollowedPosts} from './api';
import {State as UserState} from '../../../stores/user/slice';
import {listPageReducer} from '../../../stores/helper';
import {
  FollowedPostData,
  GetFollowedPostsRequest,
} from '../../../apis/post/getFollowedPosts';

export type IsLiked = number;

export type ConversationId = string;

export type CreateTime = number;

export type AuthorName = string;

export type AuthorAvatar = string;

export type AuthorId = string;

export type PostId = string;

export type City = string;

export type LikeCount = number;

export type ShareCount = number;

export type CommentCount = number;

export type IsFollowed = number;

export type IsBlocked = number;

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export interface State extends GetFollowedPostsRequest {
  list: FollowedPostData[];
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

export const getFollowedPostsAsync = createAsyncThunk<
  FollowedPostData[],
  void,
  {state: {following: State; user: UserState}}
>('following/getFollowedPosts', async (_, {getState}) => {
  const {page, pageSize} = getState().following;
  const {token} = getState().user;

  return await getFollowedPosts({page, pageSize}, token);
});

export const slice = createSlice({
  name: 'following',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    resetPage: state => {
      state.page = initialState.page;
    },

    updateListItemByAuthorId: (
      state,
      action: PayloadAction<{
        authorId: AuthorId;
        isFollowed?: IsFollowed;
        isBlocked?: IsBlocked;
      }>,
    ) => {
      const listItem = action.payload;

      const updateList = state.list;

      updateList.forEach((item, index) => {
        if (item.authorId !== listItem.authorId) {
          return;
        }

        updateList[index] = {
          ...updateList[index],
          ...listItem,
        };
      });

      state.list = updateList;
    },

    updateListItemByPostId: (
      state,
      action: PayloadAction<{
        postId: PostId;
        isLiked?: IsLiked;
        likeCount?: LikeCount;
        commentCount?: CommentCount;
        shareCount?: ShareCount;
      }>,
    ) => {
      const listItem = action.payload;

      const updateList = state.list;

      updateList.forEach((item, index) => {
        if (item.postId !== listItem.postId) {
          return;
        }

        updateList[index] = {
          ...updateList[index],
          ...listItem,
        };
      });

      state.list = updateList;
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
      });
  },
});

export const {
  resetStatus,
  resetPage,
  updateListItemByAuthorId,
  updateListItemByPostId,
} = slice.actions;

export const status = (state: RootState) => state.following.status;

export const list = (state: RootState) => state.following.list;

export default slice.reducer;
