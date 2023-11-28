import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const BIRTHDAY = __('Birthday', [], languageCode);

export const BIRTHDAY_DESC = __(
  'Receive birthday wishes from friends',
  [],
  languageCode,
);
