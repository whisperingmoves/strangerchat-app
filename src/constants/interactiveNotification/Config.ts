import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const INTERACTION_MAP = [
  __('Liked your post', [], languageCode),
  __('Commented your post', [], languageCode),
  __('Shared your post', [], languageCode),
  __('Collected your post', [], languageCode),
  __('Liked your comment', [], languageCode),
  __('Replied your comment', [], languageCode),
  __('@ you', [], languageCode),
];
