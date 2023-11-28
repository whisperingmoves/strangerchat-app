import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const SEARCH_PLACEHOLDER = __('Search notes, name', [], languageCode);

export const CLOSE_FRIEND = __('Close friend', [], languageCode);
