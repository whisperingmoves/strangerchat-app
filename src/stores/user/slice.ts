import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from '../../apis/user/registerUser';
import {copy} from '../../utils/object';
import {RootState} from '../store';
import {registerUser} from './api';
import {VerifyCodeResponse} from '../../apis/verification/verifyCode';
import {Mobile} from '../../modules/login/store/slice';

export type Error = string;

export type Scene = 'avatar' | undefined;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export interface State extends RegisterUserResponse, VerifyCodeResponse {
  mobile: Mobile;
  error: Error;
  scene: Scene;
  status: Status;
}

const initialState: State = {
  token: '',
  userId: '',
  gender: '',
  birthday: '',
  avatar: '',
  giftsReceived: 0,
  username: '',
  city: '',
  followingCount: 0,
  followersCount: 0,
  visitorsCount: 0,
  freeHeatsLeft: 0,
  coinBalance: 0,
  checkedDays: 0,
  lastCheckDate: 0,
  mobile: '',
  scene: undefined,
  error: '',
  status: 'idle',
};

export const registerUserAsync = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserRequest
>('user/registerUser', async request => {
  return await registerUser(request);
});

export const slice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
    },

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },

    setUser: (state, action: PayloadAction<any>) => {
      copy(state, action.payload);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(registerUserAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'success';

        copy(state, action.payload);
      })

      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setScene, setUser} = slice.actions;

export const status = (state: RootState) => state.user.status;

export const scene = (state: RootState) => state.user.scene;

export default slice.reducer;
