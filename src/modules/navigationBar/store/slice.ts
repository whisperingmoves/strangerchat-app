import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../../../stores/store';
import {executeCheckin} from './api';
import {CheckinResponse} from '../../../apis/user/executeCheckin';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

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
      state.status = initialState.status;
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
