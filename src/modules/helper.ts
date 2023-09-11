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
