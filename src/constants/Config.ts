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
import {__} from '../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const NEXT = __('Next', [], languageCode);

export const ALLOW_ACCESS_STORAGE = __(
  'Please allow the app to access your external storage in your app settings',
  [],
  languageCode,
);

export const ALLOW_ACCESS_CAMERA = __(
  'Please allow the app to access your camera in your app settings',
  [],
  languageCode,
);

export const CANCEL = __('Cancel', [], languageCode);

export const PERMISSION_REQUIRED = __('Permission required', [], languageCode);

export const SETTINGS = __('Settings', [], languageCode);

export const TAKE_PHOTO = __('Take a photo', [], languageCode);

export const SELECT_PHOTO = __('Select photo', [], languageCode);

export const CHAT = __('Chat', [], languageCode);

export const FOLLOWING = __('Following', [], languageCode);

export const FOLLOW = __('Follow', [], languageCode);

export const COULD_NOT_FIND_IMAGE = __(
  'Could not find image',
  [],
  languageCode,
);

export const COULD_NOT_FIND_AUDIO = __(
  'Could not find audio',
  [],
  languageCode,
);

export const HOME = __('Home', [], languageCode);

export const FOR_YOU = __('For you', [], languageCode);

export const USER = __('user', [], languageCode);

export const SEND = __('Send', [], languageCode);

export const TOP_UP = __('Top up', [], languageCode);

export const GIFT = __('Gift', [], languageCode);

export const YESTERDAY = __('Yesterday', [], languageCode);

export const ALLOW_ACCESS_MICROPHONE = __(
  'Please allow the app to access your microphone in your app settings',
  [],
  languageCode,
);

export const BLOCK = __('Block', [], languageCode);

export const UNBLOCK = __('Unblock', [], languageCode);

export const UNFOLLOW = __('Unfollow', [], languageCode);

export const REPORT = __('Report', [], languageCode);

export const FOLLOW_SUCCESSFULLY = __('Follow successfully', [], languageCode);

export const UNFOLLOW_SUCCESSFULLY = __(
  'Unfollow successfully',
  [],
  languageCode,
);

export const BLOCK_SUCCESSFULLY = __('Block successfully', [], languageCode);

export const UNBLOCK_SUCCESSFULLY = __(
  'Unblock successfully',
  [],
  languageCode,
);

export const REPORT_SUCCESSFULLY = __('Report successfully', [], languageCode);

export const GOLD_COIN_RECHARGE = __('Gold coin recharge', [], languageCode);

export const LATEST_POST_CONTENT = (latestPostContent: string) =>
  __('[Post] %s', [latestPostContent], languageCode);
