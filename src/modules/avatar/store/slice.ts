import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {uploadAvatar} from './api';
import {UploadAvatarResponse} from '../../../apis/resource/uploadAvatar';

export type Avatar = string;

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

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
      state.status = initialState.status;
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
