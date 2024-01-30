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

export const MARK_NOW = __('Mark now', [], languageCode);

export const DAILY_ATTENDANCE = __('Daily attendance', [], languageCode);

export const FIRST_DAY = __('First day', [], languageCode);

export const SECOND_DAY = __('Second day', [], languageCode);

export const THIRD_DAY = __('Third day', [], languageCode);

export const FOURTH_DAY = __('Fourth day', [], languageCode);

export const FIFTH_DAY = __('Fifth day', [], languageCode);

export const SIXTH_DAY = __('Sixth day', [], languageCode);

export const SEVENTH_DAY = __('Seventh day', [], languageCode);

export const EXPLORE = __('Explore', [], languageCode);

export const PROFILE = __('Profile', [], languageCode);

export const POST = __('Post', [], languageCode);
