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

import Config from 'react-native-config';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import avatar_boy_1 from '../assets/images/avatars/male/avatar_boy_1.png';
import avatar_boy_2 from '../assets/images/avatars/male/avatar_boy_2.png';
import avatar_boy_3 from '../assets/images/avatars/male/avatar_boy_3.png';
import avatar_boy_4 from '../assets/images/avatars/male/avatar_boy_4.png';
import avatar_boy_5 from '../assets/images/avatars/male/avatar_boy_5.png';
import avatar_boy_6 from '../assets/images/avatars/male/avatar_boy_6.png';
import avatar_boy_7 from '../assets/images/avatars/male/avatar_boy_7.png';
import avatar_boy_8 from '../assets/images/avatars/male/avatar_boy_8.png';
import icon_spying from '../assets/images/icons/icon_spying.png';
import avatar_girl_1 from '../assets/images/avatars/female/avatar_girl_1.png';
import avatar_girl_2 from '../assets/images/avatars/female/avatar_girl_2.png';
import avatar_girl_3 from '../assets/images/avatars/female/avatar_girl_3.png';
import avatar_girl_4 from '../assets/images/avatars/female/avatar_girl_4.png';
import avatar_girl_5 from '../assets/images/avatars/female/avatar_girl_5.png';
import avatar_girl_6 from '../assets/images/avatars/female/avatar_girl_6.png';
import avatar_girl_7 from '../assets/images/avatars/female/avatar_girl_7.png';
import avatar_girl_8 from '../assets/images/avatars/female/avatar_girl_8.png';
import {Avatar} from './avatar/store/slice';
import {USER} from '../constants/Config';

export const generateFullURL = (serverURL: string): string => {
  const baseURL = Config.BASE_URL as string;

  const normalizedBaseURL = baseURL.endsWith('/') ? baseURL : baseURL + '/';

  const normalizedServerURL = serverURL.startsWith('/')
    ? serverURL.substring(1)
    : serverURL;

  return normalizedBaseURL + normalizedServerURL;
};

export const AVATAR_BOY_LIST: ImageSourcePropType[] = [
  avatar_boy_1,
  avatar_boy_2,
  avatar_boy_3,
  avatar_boy_4,
  avatar_boy_5,
  avatar_boy_6,
  avatar_boy_7,
  avatar_boy_8,
  icon_spying,
];

export const AVATAR_GIRL_LIST: ImageSourcePropType[] = [
  avatar_girl_1,
  avatar_girl_2,
  avatar_girl_3,
  avatar_girl_4,
  avatar_girl_5,
  avatar_girl_6,
  avatar_girl_7,
  avatar_girl_8,
  icon_spying,
];

export const AVATAR_BOY_URL_LIST: Avatar[] = [
  'public/avatars/male/avatar_boy_1.png',
  'public/avatars/male/avatar_boy_2.png',
  'public/avatars/male/avatar_boy_3.png',
  'public/avatars/male/avatar_boy_4.png',
  'public/avatars/male/avatar_boy_5.png',
  'public/avatars/male/avatar_boy_6.png',
  'public/avatars/male/avatar_boy_7.png',
  'public/avatars/male/avatar_boy_8.png',
];

export const AVATAR_GIRL_URL_LIST: Avatar[] = [
  'public/avatars/female/avatar_girl_1.png',
  'public/avatars/female/avatar_girl_2.png',
  'public/avatars/female/avatar_girl_3.png',
  'public/avatars/female/avatar_girl_4.png',
  'public/avatars/female/avatar_girl_5.png',
  'public/avatars/female/avatar_girl_6.png',
  'public/avatars/female/avatar_girl_7.png',
  'public/avatars/female/avatar_girl_8.png',
];

export const getUsername = (userId: string): string => {
  const lastSixDigits = userId.slice(-6);
  return `${USER}_${lastSixDigits}`;
};
