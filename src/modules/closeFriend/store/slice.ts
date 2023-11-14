import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State as UserState} from '../../../stores/user/slice';
import {
  GetFriendsRequest,
  GetFriendsResponse,
  UserData as FriendUserData,
} from '../../../apis/user/getFriends';
import {getFriends} from './api';
import {listPageWithTotalReducer} from '../../../stores/helper';
import {RootState} from '../../../stores/store';
import {copy} from '../../../utils/object';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type Keyword = string;

export type Total = number;

export interface State extends GetFriendsRequest {
  list: FriendUserData[];
  total: Total;
  error: Error;
  status: Status;
}

const initialState: State = {
  list: [],
  total: 0,
  page: 1,
  pageSize: 10,
  error: '',
  status: 'idle',
};

export const getFriendsAsync = createAsyncThunk<
  GetFriendsResponse,
  void,
  {state: {closeFriend: State; user: UserState}}
>('closeFriend/getFriends', async (_, {getState}) => {
  const {token} = getState().user;
  const {page, pageSize, keyword} = getState().closeFriend;

  return await getFriends({page, pageSize, keyword}, token);
});

export const slice = createSlice({
  name: 'closeFriend',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
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
      .addCase(getFriendsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getFriendsAsync.fulfilled, listPageWithTotalReducer)

      .addCase(getFriendsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setState, setKeyword, resetPage} = slice.actions;

export const status = (state: RootState) => state.closeFriend.status;

export const list = (state: RootState) => state.closeFriend.list;

export const total = (state: RootState) => state.closeFriend.total;

export const keyword = (state: RootState) => state.closeFriend.keyword;

export default slice.reducer;
