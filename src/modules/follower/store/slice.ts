import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State as UserState} from '../../../stores/user/slice';
import {getFollowers} from './api';
import {listPageReducer} from '../../../stores/helper';
import {RootState} from '../../../stores/store';
import {
  GetFollowersRequest,
  UserData as FollowerUserData,
} from '../../../apis/user/getFollowers';
import {copy} from '../../../utils/object';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export type Keyword = string;

export interface State extends GetFollowersRequest {
  list: FollowerUserData[];
  error: Error;
  status: Status;
}

const initialState: State = {
  list: [],
  page: 1,
  pageSize: 10,
  error: '',
  status: 'idle',
};

export const getFollowersAsync = createAsyncThunk<
  FollowerUserData[],
  void,
  {state: {follower: State; user: UserState}}
>('follower/getFollowers', async (_, {getState}) => {
  const {token} = getState().user;
  const {page, pageSize, keyword} = getState().follower;

  return await getFollowers({page, pageSize, keyword}, token);
});

export const slice = createSlice({
  name: 'follower',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
    },

    setKeyword: (state, action: PayloadAction<Keyword>) => {
      state.keyword = action.payload;
    },

    resetPage: state => {
      state.page = initialState.page;
    },

    setState: (state, action: PayloadAction<any>) => {
      copy(state, action.payload);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getFollowersAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getFollowersAsync.fulfilled, listPageReducer)

      .addCase(getFollowersAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setState, setKeyword, resetPage} = slice.actions;

export const status = (state: RootState) => state.follower.status;

export const list = (state: RootState) => state.follower.list;

export const keyword = (state: RootState) => state.follower.keyword;

export default slice.reducer;
