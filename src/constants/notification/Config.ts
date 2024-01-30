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

export const NOTIFICATION = __('Notification', [], languageCode);

export const INTERACTIVE = __('Interactive', [], languageCode);

export const STATUS = __('Status', [], languageCode);

export const SYSTEM = __('System', [], languageCode);

export const VIEW_DETAILS = __('View details', [], languageCode);

export const NO_NOTIFICATION_FOUND = __(
  'No notification found',
  [],
  languageCode,
);

export const WE_DID_NOT_FOUND_ANY_NOTIFICATION = __(
  'We did not found any notification',
  [],
  languageCode,
);
