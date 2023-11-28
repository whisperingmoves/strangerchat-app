import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const WELCOME = __('Welcome.', [], languageCode);

export const WELCOME_MESSAGE = __(
  'A new and exciting way to make new friends !',
  [],
  languageCode,
);

export const AGREE_TO_OUR = __('Agree to our ', [], languageCode);

export const AND = __(' and ', [], languageCode);

export const TERMS = __('Terms', [], languageCode);

export const DATA_POLICY = __('Data Policy.', [], languageCode);

export const GET_VERIFICATION_CODE = __(
  'Get verification code',
  [],
  languageCode,
);

export const LOGIN_WITH = __('Login with', [], languageCode);

export const MOBILE_NUMBER = __('Mobile number', [], languageCode);

export const MOBILE_NUMBER_CAN_NOT_BE_EMPTY = __(
  'Mobile number can not be empty',
  [],
  languageCode,
);

export const INVALID_MOBILE_NUMBER = __(
  'Invalid mobile number',
  [],
  languageCode,
);
