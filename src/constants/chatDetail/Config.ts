import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const DETAILS = __('Details', [], languageCode);

export const MATCH = __('Match', [], languageCode);

export const SAY_SOMETHING = __('Say something...', [], languageCode);

export const IMAGE = __('Image', [], languageCode);

export const VOICE = __('Voice', [], languageCode);

export const IMAGE_CACHE_FAILURE = __('Image Cache Failure', [], languageCode);

export const VOICE_CACHE_FAILURE = __('Voice Cache Failure', [], languageCode);
