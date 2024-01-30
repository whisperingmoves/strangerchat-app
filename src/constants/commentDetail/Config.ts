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

export const FREE_TIMES = (times: number) =>
  __('Free %d times', [times], languageCode);

export const WARM_UP = (gender: 'male' | 'female') =>
  __('Warm %s up~~', [gender === 'male' ? 'him' : 'her'], languageCode);

export const REPORT_HINT = __(
  'Long press the comment to report~',
  [],
  languageCode,
);

export const ENTER_COMMENT = __('Enter comment...', [], languageCode);

export const REPLY_COMMENT = (username: string) =>
  __('Re %s: ', [username], languageCode);

export const POST_HEATED_SUCCESSFULLY = __(
  'Post heated successfully',
  [],
  languageCode,
);

export const FREE_HEATING_TIMES_HAVE_BEEN_USED_UP = __(
  'Free heating times have been used up',
  [],
  languageCode,
);

export const SUCCESSFUL_GIFT_GIVING = __(
  'Successful gift giving',
  [],
  languageCode,
);
