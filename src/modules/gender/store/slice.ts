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
