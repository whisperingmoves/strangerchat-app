import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const SETTING = __('Setting', [], languageCode);

export const NEW_NOTICE = __('New notices', [], languageCode);

export const SIGN_OUT = __('Sign out', [], languageCode);
