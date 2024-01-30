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
import {getStoryList} from './api';
import {Story} from '../../../apis/story/getStoryList';
import {State as UserState} from '../../../stores/user/slice';
import {listPageReducer} from '../../../stores/helper';
import {
  NearestUser,
  NearestUsers,
} from '../../../apis/notification/nearestUsers';
import {OnlineUsers} from '../../../apis/notification/onlineUsers';
import {MUTUAL, NEW} from '../../../constants/home/Config';
import {FOLLOW, FOLLOWING} from '../../../constants/Config';

export type Distance = number;

export type UserId = string;

export type FirstImage = string;

export type Relation = number;

export const RELATION_MAP = [MUTUAL, FOLLOWING, FOLLOW, NEW];

export type Username = string;

export type CreateTime = number;

export type Online = number;

export type Page = number;

export type PageSize = number;

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export interface State {
  nearestUsers: NearestUser[];
  onlineUsers: Online;
  list: Story[];
  page: Page;
  pageSize: PageSize;
  error: Error;
  status: Status;
}

const initialState: State = {
  nearestUsers: [],
  onlineUsers: 0,
  list: [],
  page: 1,
  pageSize: 10,
  error: '',
  status: 'idle',
};

export const getStoryListAsync = createAsyncThunk<
  Story[],
  void,
  {state: {home: State; user: UserState}}
>('home/getStoryList', async (_, {getState}) => {
  const {page, pageSize} = getState().home;
  const {token} = getState().user;

  return await getStoryList(page, pageSize, token);
});

export const slice = createSlice({
  name: 'home',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    resetPage: state => {
      state.page = initialState.page;
    },

    setNearestUsers: (state, action: PayloadAction<NearestUsers>) => {
      if (action.payload.users) {
        state.nearestUsers = action.payload.users;
      }
    },

    setOnlineUsers: (state, action: PayloadAction<OnlineUsers>) => {
      if (action.payload.online) {
        state.onlineUsers = action.payload.online;
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getStoryListAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getStoryListAsync.fulfilled, listPageReducer)

      .addCase(getStoryListAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, resetPage, setNearestUsers, setOnlineUsers} =
  slice.actions;

export const status = (state: RootState) => state.home.status;

export const list = (state: RootState) => state.home.list;

export const nearestUsers = (state: RootState) => state.home.nearestUsers;

export const onlineUsers = (state: RootState) => state.home.onlineUsers;

export default slice.reducer;
