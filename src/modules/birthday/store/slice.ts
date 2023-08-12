import {createSlice} from '@reduxjs/toolkit';

export type Birthday = Date;

export interface State {}

const initialState: State = {};

export const slice = createSlice({
  name: 'birthday',

  initialState,

  reducers: {},

  extraReducers: () => {},
});

export default slice.reducer;
