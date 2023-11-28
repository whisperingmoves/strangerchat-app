import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const RECOMMEND = __('Recommend', [], languageCode);

export const LATEST = __('Latest', [], languageCode);
