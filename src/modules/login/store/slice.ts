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
