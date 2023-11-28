import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const WALLET = __('Wallet', [], languageCode);

export const CARD = __('Card', [], languageCode);

export const TRANSACTIONS = __('Transactions', [], languageCode);

export const TOTAL_ASSETS = __('Total assets', [], languageCode);

export const RECENTLY_TRANSACTIONS = __(
  'Recently Transactions',
  [],
  languageCode,
);
