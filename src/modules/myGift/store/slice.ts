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
import {GiftData} from '../../../apis/gift/getReceivedGifts';
import {State as UserState} from '../../../stores/user/slice';
import {getReceivedGifts} from './api';
import {RootState} from '../../../stores/store';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type Range = 0 | 1 | 2;

export type Avatar = string;

export type CurrentRanking = number;

export interface State {
  list: GiftData[];
  range?: Range;
  error: Error;
  status: Status;
}

const initialState: State = {
  list: [],
  range: 0,
  error: '',
  status: 'idle',
};

export const getReceivedGiftsAsync = createAsyncThunk<
  GiftData[],
  void,
  {state: {myGift: State; user: UserState}}
>('myGift/getReceivedGifts', async (_, {getState}) => {
  const {token} = getState().user;
  const {range} = getState().myGift;

  return await getReceivedGifts({range}, token);
});

export const slice = createSlice({
  name: 'myGift',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    setRange: (state, action: PayloadAction<Range>) => {
      state.range = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getReceivedGiftsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(
        getReceivedGiftsAsync.fulfilled,
        (state, action: PayloadAction<GiftData[]>) => {
          state.list = action.payload;

          state.status = 'success';
        },
      )

      .addCase(getReceivedGiftsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setRange} = slice.actions;

export const status = (state: RootState) => state.myGift.status;

export const list = (state: RootState) => state.myGift.list;

export const range = (state: RootState) => state.myGift.range;

export default slice.reducer;
