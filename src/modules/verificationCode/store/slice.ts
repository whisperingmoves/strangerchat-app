import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {verifyCode} from './api';
import {
  VerifyCodeRequest,
  VerifyCodeResponse,
} from '../../../apis/verification/verifyCode';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export interface State {
  payload: VerifyCodeResponse | undefined;
  error: Error;
  status: Status;
}

const initialState: State = {
  payload: undefined,
  error: '',
  status: 'idle',
};

export const verifyCodeAsync = createAsyncThunk<
  VerifyCodeResponse,
  VerifyCodeRequest
>('verificationCode/verifyCode', async request => {
  return await verifyCode(request);
});

export const slice = createSlice({
  name: 'verificationCode',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(verifyCodeAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(verifyCodeAsync.fulfilled, (state, action) => {
        state.status = 'success';

        state.payload = action.payload;
      })

      .addCase(verifyCodeAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus} = slice.actions;

export const status = (state: RootState) => state.verificationCode.status;

export default slice.reducer;
