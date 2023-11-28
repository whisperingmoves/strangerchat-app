import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const INSUFFICIENT_GOLD_BALANCE = __(
  'Insufficient gold balance',
  [],
  languageCode,
);
