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
import {uploadAvatar} from './api';
import {UploadAvatarResponse} from '../../../apis/resource/uploadAvatar';

export type Avatar = string;

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export interface State extends UploadAvatarResponse {
  error: Error;
  status: Status;
}

const initialState: State = {
  url: '',
  error: '',
  status: 'idle',
};

export const uploadAvatarAsync = createAsyncThunk<UploadAvatarResponse, string>(
  'avatar/uploadAvatar',
  async avatar => {
    return await uploadAvatar(avatar);
  },
);

export const slice = createSlice({
  name: 'avatar',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },
  },

  extraReducers: builder => {
    builder
      .addCase(uploadAvatarAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(uploadAvatarAsync.fulfilled, (state, action) => {
        state.status = 'success';

        state.url = action.payload.url;
      })

      .addCase(uploadAvatarAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus} = slice.actions;

export const status = (state: RootState) => state.avatar.status;

export const url = (state: RootState) => state.avatar.url;

export default slice.reducer;
