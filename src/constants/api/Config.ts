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

export const BAD_REQUEST = __('Bad Request', [], languageCode);

export const FORBIDDEN = __('Access Forbidden', [], languageCode);

export const NOT_FOUND = __('Resource Not Found', [], languageCode);

export const TOO_MANY_REQUESTS = (retryAfter: string) =>
  __(
    'Too Many Requests. Please retry after %s seconds.',
    [retryAfter],
    languageCode,
  );

export const INTERNAL_SERVER_ERROR = __(
  'Internal Server Error',
  [],
  languageCode,
);
