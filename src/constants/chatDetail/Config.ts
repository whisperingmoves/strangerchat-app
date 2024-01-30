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

export const DETAILS = __('Details', [], languageCode);

export const MATCH = __('Match', [], languageCode);

export const SAY_SOMETHING = __('Say something...', [], languageCode);

export const IMAGE = __('Image', [], languageCode);

export const VOICE = __('Voice', [], languageCode);

export const IMAGE_CACHE_FAILURE = __('Image Cache Failure', [], languageCode);

export const VOICE_CACHE_FAILURE = __('Voice Cache Failure', [], languageCode);
