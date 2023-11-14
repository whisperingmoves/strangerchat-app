import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment/moment';
import {State as UserState} from '../../../stores/user/slice';
import {getCoinTransactions} from './api';
import {listPageReducer} from '../../../stores/helper';
import {RootState} from '../../../stores/store';
import {TransactionData} from '../../../apis/transaction/getCoinTransactions';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type Page = number;

export type PageSize = number;

export type DateFilter = string;

export interface State {
  list: TransactionData[];
  page: Page;
  pageSize: PageSize;
  date: DateFilter;
  error: Error;
  status: Status;
}

const initialState: State = {
  list: [],
  page: 1,
  pageSize: 10,
  date: new Date().toDateString(),
  error: '',
  status: 'idle',
};

export const getCoinTransactionsAsync = createAsyncThunk<
  TransactionData[],
  void,
  {state: {wallet: State; user: UserState}}
>('wallet/getGiftList', async (_, {getState}) => {
  const {token} = getState().user;

  const {page, pageSize, date} = getState().wallet;

  return await getCoinTransactions(
    {page, pageSize, date: moment(new Date(date)).format('YYYY-MM-DD')},
    token,
  );
});

export const slice = createSlice({
  name: 'wallet',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = 'reset';
    },

    resetPage: state => {
      state.page = initialState.page;
    },

    setDate: (state, action: PayloadAction<DateFilter>) => {
      state.date = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getCoinTransactionsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getCoinTransactionsAsync.fulfilled, listPageReducer)

      .addCase(getCoinTransactionsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, resetPage, setDate} = slice.actions;

export const status = (state: RootState) => state.wallet.status;

export const list = (state: RootState) => state.wallet.list;

export const date = (state: RootState) => state.wallet.date;

export default slice.reducer;
