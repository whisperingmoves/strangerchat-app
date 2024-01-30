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
import {State as UserState} from '../../../stores/user/slice';
import {getFollowingUsers} from './api';
import {listPageReducer} from '../../../stores/helper';
import {RootState} from '../../../stores/store';
import {
  GetFollowingUsersRequest,
  UserData as FollowingUserData,
} from '../../../apis/user/getFollowingUsers';
import {copy} from '../../../utils/object';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type Keyword = string;

export interface State extends GetFollowingUsersRequest {
  list: FollowingUserData[];
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

export const getFollowingUsersAsync = createAsyncThunk<
  FollowingUserData[],
  void,
  {state: {followingUser: State; user: UserState}}
>('followingUser/getFollowingUsers', async (_, {getState}) => {
  const {token} = getState().user;
  const {page, pageSize, keyword} = getState().followingUser;

  return await getFollowingUsers({page, pageSize, keyword}, token);
});

export const slice = createSlice({
  name: 'followingUser',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    setKeyword: (state, action: PayloadAction<Keyword>) => {
      state.keyword = action.payload;
    },

    resetPage: state => {
      state.page = initialState.page;
    },

    setState: (state, action: PayloadAction<any>) => {
      copy(state, action.payload);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getFollowingUsersAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getFollowingUsersAsync.fulfilled, listPageReducer)

      .addCase(getFollowingUsersAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setState, setKeyword, resetPage} = slice.actions;

export const status = (state: RootState) => state.followingUser.status;

export const list = (state: RootState) => state.followingUser.list;

export const keyword = (state: RootState) => state.followingUser.keyword;

export default slice.reducer;
