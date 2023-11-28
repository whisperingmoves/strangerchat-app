import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const PURCHASE_SUCCESSFULLY = __(
  'Purchase Successfully',
  [],
  languageCode,
);

export const BALANCE = __('Balance:', [], languageCode);
