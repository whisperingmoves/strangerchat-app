import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GiftData} from '../../../apis/gift/getReceivedGifts';
import {State as UserState} from '../../../stores/user/slice';
import {getReceivedGifts} from './api';
import {RootState} from '../../../stores/store';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type Range = 0 | 1 | 2;

export type Avatar = string;

export type CurrentRanking = number;

export interface State {
  list: GiftData[];
  range?: Range;
  error: Error;
  status: Status;
}

const initialState: State = {
  list: [],
  range: 0,
  error: '',
  status: 'idle',
};

export const getReceivedGiftsAsync = createAsyncThunk<
  GiftData[],
  void,
  {state: {myGift: State; user: UserState}}
>('myGift/getReceivedGifts', async (_, {getState}) => {
  const {token} = getState().user;
  const {range} = getState().myGift;

  return await getReceivedGifts({range}, token);
});

export const slice = createSlice({
  name: 'myGift',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    setRange: (state, action: PayloadAction<Range>) => {
      state.range = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getReceivedGiftsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(
        getReceivedGiftsAsync.fulfilled,
        (state, action: PayloadAction<GiftData[]>) => {
          state.list = action.payload;

          state.status = 'success';
        },
      )

      .addCase(getReceivedGiftsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, setRange} = slice.actions;

export const status = (state: RootState) => state.myGift.status;

export const list = (state: RootState) => state.myGift.list;

export const range = (state: RootState) => state.myGift.range;

export default slice.reducer;
