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

import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const WELCOME = __('Welcome.', [], languageCode);

export const WELCOME_MESSAGE = __(
  'A new and exciting way to make new friends !',
  [],
  languageCode,
);

export const AGREE_TO_OUR = __('Agree to our ', [], languageCode);

export const AND = __(' and ', [], languageCode);

export const TERMS = __('Terms', [], languageCode);

export const DATA_POLICY = __('Data Policy.', [], languageCode);

export const GET_VERIFICATION_CODE = __(
  'Get verification code',
  [],
  languageCode,
);

export const LOGIN_WITH = __('Login with', [], languageCode);

export const MOBILE_NUMBER = __('Mobile number', [], languageCode);

export const MOBILE_NUMBER_CAN_NOT_BE_EMPTY = __(
  'Mobile number can not be empty',
  [],
  languageCode,
);

export const INVALID_MOBILE_NUMBER = __(
  'Invalid mobile number',
  [],
  languageCode,
);
