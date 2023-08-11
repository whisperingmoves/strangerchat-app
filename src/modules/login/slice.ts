import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../../stores/store';
import {sendSMSVerificationCode} from './api';

export type Mobile = string;

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export interface State {
  error: Error;
  status: Status;
}

const initialState: State = {
  error: '',
  status: 'idle',
};

export const sendSMSVerificationCodeAsync = createAsyncThunk<void, string>(
  'login/sendSMSVerificationCode',
  async mobile => {
    await sendSMSVerificationCode(mobile);
  },
);

export const slice = createSlice({
  name: 'login',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(sendSMSVerificationCodeAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(sendSMSVerificationCodeAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(sendSMSVerificationCodeAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus} = slice.actions;

export const status = (state: RootState) => state.login.status;

export default slice.reducer;
