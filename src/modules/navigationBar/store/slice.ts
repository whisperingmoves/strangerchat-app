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

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {executeCheckin} from './api';
import {CheckinResponse} from '../../../apis/user/executeCheckin';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export interface State {
  payload: CheckinResponse | undefined;
  error: Error;
  status: Status;
}

const initialState: State = {
  payload: undefined,
  error: '',
  status: 'idle',
};

export const executeCheckinAsync = createAsyncThunk<CheckinResponse, string>(
  'navigationBar/executeCheckin',
  async token => {
    return await executeCheckin(token);
  },
);

export const slice = createSlice({
  name: 'navigationBar',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },
  },

  extraReducers: builder => {
    builder
      .addCase(executeCheckinAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(executeCheckinAsync.fulfilled, (state, action) => {
        state.status = 'success';

        state.payload = action.payload;
      })

      .addCase(executeCheckinAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus} = slice.actions;

export const status = (state: RootState) => state.navigationBar.status;

export default slice.reducer;
