import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const PUBLISH = __('Publish', [], languageCode);

export const CONFIRM = __('Confirm', [], languageCode);

export const PLACE_HOLDER = __(
  'For those who understand you...',
  [],
  languageCode,
);

export const PUBLIC = __('Public', [], languageCode);

export const PRIVATE = __('Private', [], languageCode);

export const UNKNOWN = __('Unknown', [], languageCode);
