import {UserPostData} from '../../../apis/user/getUserPosts';
import {GetUserDetailResponse} from '../../../apis/user/getUserDetail';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State as UserState} from '../../../stores/user/slice';
import {getUserDetail, getUserPosts} from './api';
import {listPageReducer} from '../../../stores/helper';
import {copy} from '../../../utils/object';
import {RootState} from '../../../stores/store';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type UserId = string;

export type Scene = 'getUserDetail' | 'getUserPosts';

export interface State extends GetUserDetailResponse {
  list: UserPostData[];
  page: number;
  pageSize: number;
  error: Error;
  status: Status;
  scene?: Scene;
}

const initialState: State = {
  list: [],
  page: 1,
  pageSize: 10,
  error: '',
  status: 'idle',
  avatar: '',
  username: '',
  city: '',
  followingCount: 0,
  followersCount: 0,
  visitorsCount: 0,
};

export const getUserDetailAsync = createAsyncThunk<
  GetUserDetailResponse,
  string,
  {state: {profile: State; user: UserState}}
>('profile/getUserDetail', async (userId, {getState}) => {
  const {token} = getState().user;

  return await getUserDetail({userId}, token);
});

export const getUserPostsAsync = createAsyncThunk<
  UserPostData[],
  string,
  {state: {profile: State; user: UserState}}
>('profile/getUserPosts', async (userId, {getState}) => {
  const {token} = getState().user;
  const {page, pageSize} = getState().profile;

  return await getUserPosts({userId, page, pageSize}, token);
});

export const slice = createSlice({
  name: 'profile',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    resetPage: state => {
      state.page = initialState.page;
    },

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getUserPostsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getUserPostsAsync.fulfilled, listPageReducer)

      .addCase(getUserPostsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(getUserDetailAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(
        getUserDetailAsync.fulfilled,
        (state, action: PayloadAction<GetUserDetailResponse>) => {
          state.status = 'success';

          copy(state, action.payload);
        },
      )

      .addCase(getUserDetailAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, resetPage, setScene} = slice.actions;

export const status = (state: RootState) => state.profile.status;

export const list = (state: RootState) => state.profile.list;

export const scene = (state: RootState) => state.profile.scene;

export const avatar = (state: RootState) => state.profile.avatar;

export const username = (state: RootState) => state.profile.username;

export const city = (state: RootState) => state.profile.city;

export const followingCount = (state: RootState) =>
  state.profile.followingCount;

export const followersCount = (state: RootState) =>
  state.profile.followersCount;

export const visitorsCount = (state: RootState) => state.profile.visitorsCount;

export default slice.reducer;
