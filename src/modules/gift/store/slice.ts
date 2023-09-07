import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GiftData} from '../../../apis/gift/getGiftList';
import {State as UserState} from '../../../stores/user/slice';
import {getGiftList, sendGift} from './api';
import {SendGiftRequest} from '../../../apis/gift/sendGift';
import {listPageReducer} from '../../../stores/helper';
import {RootState} from '../../../stores/store';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export type Page = number;

export type PageSize = number;

export type Scene = 'chatDetail' | 'postDetail';

export type Id = string;

export type Image = string;

export type Value = number;

export interface State {
  list: GiftData[];
  page: Page;
  pageSize: PageSize;
  scene?: Scene;
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

export const getGiftListAsync = createAsyncThunk<
  GiftData[],
  void,
  {state: {gift: State; user: UserState}}
>('gift/getGiftList', async (_, {getState}) => {
  const {token} = getState().user;
  const {page, pageSize} = getState().gift;

  return await getGiftList(page, pageSize, token);
});

export const sendGiftAsync = createAsyncThunk<
  void,
  SendGiftRequest,
  {state: {user: UserState}}
>('gift/sendGift', async (request, {getState}) => {
  const {token} = getState().user;

  return await sendGift(request, token);
});

export const slice = createSlice({
  name: 'gift',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
    },

    setScene: (state, action: PayloadAction<Scene>) => {
      state.scene = action.payload;
    },

    resetPage: state => {
      state.page = initialState.page;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getGiftListAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getGiftListAsync.fulfilled, listPageReducer)

      .addCase(getGiftListAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(sendGiftAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(sendGiftAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(sendGiftAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setScene, resetPage} = slice.actions;

export const status = (state: RootState) => state.gift.status;

export const scene = (state: RootState) => state.gift.scene;

export const list = (state: RootState) => state.gift.list;

export default slice.reducer;