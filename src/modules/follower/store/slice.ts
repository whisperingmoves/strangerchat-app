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
import {getFollowers} from './api';
import {listPageReducer} from '../../../stores/helper';
import {RootState} from '../../../stores/store';
import {
  GetFollowersRequest,
  UserData as FollowerUserData,
} from '../../../apis/user/getFollowers';
import {copy} from '../../../utils/object';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type Keyword = string;

export interface State extends GetFollowersRequest {
  list: FollowerUserData[];
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

export const getFollowersAsync = createAsyncThunk<
  FollowerUserData[],
  void,
  {state: {follower: State; user: UserState}}
>('follower/getFollowers', async (_, {getState}) => {
  const {token} = getState().user;
  const {page, pageSize, keyword} = getState().follower;

  return await getFollowers({page, pageSize, keyword}, token);
});

export const slice = createSlice({
  name: 'follower',

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
      .addCase(getFollowersAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getFollowersAsync.fulfilled, listPageReducer)

      .addCase(getFollowersAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setState, setKeyword, resetPage} = slice.actions;

export const status = (state: RootState) => state.follower.status;

export const list = (state: RootState) => state.follower.list;

export const keyword = (state: RootState) => state.follower.keyword;

export default slice.reducer;
