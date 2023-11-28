import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const AVATAR = __('Avatar', [], languageCode);

export const AVATAR_DESC = __('Select the avatar you like', [], languageCode);

export const UPLOAD = __('Upload', [], languageCode);

export const AVATAR_CANNOT_BE_EMPTY = __(
  'Avatar cannot be empty',
  [],
  languageCode,
);
