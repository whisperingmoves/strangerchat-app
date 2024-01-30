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
import {sendCode} from './api';
import {GeoPosition} from 'react-native-geolocation-service';
import {getLocation} from '../../../utils/geolocation';

export type Mobile = string;

export type Error = string;

export type Scene = 'login' | 'getLocation' | 'verificationCode' | undefined;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export interface State {
  position: GeoPosition | undefined;
  error: Error;
  scene: Scene;
  status: Status;
}

const initialState: State = {
  position: undefined,
  error: '',
  scene: undefined,
  status: 'idle',
};

export const sendCodeAsync = createAsyncThunk<void, string>(
  'login/sendCode',
  async mobile => {
    await sendCode(mobile);
  },
);

export const getLocationAsync = createAsyncThunk<GeoPosition | undefined, void>(
  'login/getLocation',
  async () => {
    return await getLocation();
  },
);

export const slice = createSlice({
  name: 'login',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(sendCodeAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(sendCodeAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(sendCodeAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })
      .addCase(getLocationAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getLocationAsync.fulfilled, (state, action) => {
        state.status = 'success';

        state.position = action.payload;
      })

      .addCase(getLocationAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setScene} = slice.actions;

export const status = (state: RootState) => state.login.status;

export const scene = (state: RootState) => state.login.scene;

export default slice.reducer;
