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
import {Gender} from './gender/store/slice';
import {Image} from 'react-native';

export const generateLocalAvatar = (gender: Gender, index: number) => {
  return `avatar_${gender === 'male' ? 'boy' : 'girl'}_${index + 1}`;
};

export const generateFullURL = (serverURL: string): string => {
  const baseURL = Config.BASE_URL as string;
  const normalizedBaseURL = baseURL.endsWith('/') ? baseURL : baseURL + '/';
  const normalizedServerURL = serverURL.startsWith('/')
    ? serverURL.substring(1)
    : serverURL;

  if (serverURL.startsWith('avatar_boy_')) {
    const index = parseInt(serverURL.substring('avatar_boy_'.length), 10) - 1;
    const avatarBoyPath = AVATAR_BOY_LIST[index];
    return Image.resolveAssetSource(avatarBoyPath).uri;
  }

  if (serverURL.startsWith('avatar_girl_')) {
    const index = parseInt(serverURL.substring('avatar_girl_'.length), 10) - 1;
    const avatarGirlPath = AVATAR_GIRL_LIST[index];
    return Image.resolveAssetSource(avatarGirlPath).uri;
  }

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
