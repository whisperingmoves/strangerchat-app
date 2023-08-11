import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../../stores/store';
import {sendCode} from './api';

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

export const sendCodeAsync = createAsyncThunk<void, string>(
  'login/sendCode',
  async mobile => {
    await sendCode(mobile);
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
      .addCase(sendCodeAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(sendCodeAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(sendCodeAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus} = slice.actions;

export const status = (state: RootState) => state.login.status;

export default slice.reducer;
