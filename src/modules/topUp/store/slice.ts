import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State as UserState} from '../../../stores/user/slice';
import {listPageReducer} from '../../../stores/helper';
import {RootState} from '../../../stores/store';
import {CoinProduct} from '../../../apis/product/getCoinProducts';
import {buyCoinProduct, getCoinProducts} from './api';
import {BuyCoinProductRequest} from '../../../apis/product/buyCoinProduct';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success';

export type Page = number;

export type PageSize = number;

export type Coins = number;

export type Price = number;

export type ProductId = string;

export type Scene = 'getCoinProducts' | 'buyCoinProduct';

export interface State {
  list: CoinProduct[];
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

export const getCoinProductsAsync = createAsyncThunk<
  CoinProduct[],
  void,
  {state: {topUp: State; user: UserState}}
>('topUp/getCoinProducts', async (_, {getState}) => {
  const {token} = getState().user;
  const {page, pageSize} = getState().topUp;

  return await getCoinProducts(page, pageSize, token);
});

export const buyCoinProductAsync = createAsyncThunk<
  void,
  {productId: string; request: BuyCoinProductRequest},
  {state: {user: UserState}}
>('topUp/buyCoinProduct', async (param, {getState}) => {
  const {token} = getState().user;

  return await buyCoinProduct(param.productId, param.request, token);
});

export const slice = createSlice({
  name: 'topUp',

  initialState,

  reducers: {
    resetStatus: state => {
      state.status = initialState.status;
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
      .addCase(getCoinProductsAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(getCoinProductsAsync.fulfilled, listPageReducer)

      .addCase(getCoinProductsAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      })

      .addCase(buyCoinProductAsync.pending, state => {
        state.status = 'loading';
      })

      .addCase(buyCoinProductAsync.fulfilled, state => {
        state.status = 'success';
      })

      .addCase(buyCoinProductAsync.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message || '';
      });
  },
});

export const {resetStatus, resetPage, setScene} = slice.actions;

export const status = (state: RootState) => state.topUp.status;

export const list = (state: RootState) => state.topUp.list;

export const scene = (state: RootState) => state.topUp.scene;

export default slice.reducer;
