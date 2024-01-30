// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State as UserState} from '../../../stores/user/slice';
import {listPageReducer} from '../../../stores/helper';
import {RootState} from '../../../stores/store';
import {CoinProduct} from '../../../apis/product/getCoinProducts';
import {buyCoinProduct, getCoinProducts} from './api';
import {BuyCoinProductRequest} from '../../../apis/product/buyCoinProduct';

export type Error = string;

export type Status = 'idle' | 'loading' | 'failed' | 'success' | 'reset';

export type Page = number;

export type PageSize = number;

export type Coins = number;

export type Price = number;

export type ProductId = string;

export type Currency = string;

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
