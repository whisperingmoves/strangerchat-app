import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const MY_GIFT = __('My gifts', [], languageCode);

export const ALL_TIME = __('ALL Time', [], languageCode);

export const WEEK = __('Week', [], languageCode);

export const MONTH = __('Month', [], languageCode);
