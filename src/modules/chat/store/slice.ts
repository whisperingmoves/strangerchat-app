import {createSlice} from '@reduxjs/toolkit';

export interface State {}

const initialState: State = {};

export const slice = createSlice({
  name: 'chat',

  initialState,

  reducers: {},

  extraReducers: () => {},
});

export const {} = slice.actions;

export default slice.reducer;
