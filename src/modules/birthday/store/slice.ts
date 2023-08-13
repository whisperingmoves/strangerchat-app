import {createSlice} from '@reduxjs/toolkit';

export type Birthday = string;

export interface State {}

const initialState: State = {};

export const slice = createSlice({
  name: 'birthday',

  initialState,

  reducers: {},

  extraReducers: () => {},
});

export default slice.reducer;
