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

export const VERIFICATION_CODE = __('Verification code', [], languageCode);

export const VERIFICATION_CODE_DESC = __('Has been sent to ', [], languageCode);

export const RESEND_IN_SECONDS = (second: number) =>
  __('Resend in %d seconds', [second], languageCode);

export const RESEND = __('Resend', [], languageCode);

export const CODE_ERROR = __('Code error', [], languageCode);
