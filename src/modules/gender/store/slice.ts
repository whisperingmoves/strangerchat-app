import {createSlice} from '@reduxjs/toolkit';
import {FEMALE, MALE} from '../../../constants/gender/Config';

export type Gender = 'male' | 'female';

export const GENDER_MAP = {
  male: MALE,
  female: FEMALE,
};

export interface State {}

const initialState: State = {};

export const slice = createSlice({
  name: 'gender',

  initialState,

  reducers: {},

  extraReducers: () => {},
});

export default slice.reducer;
