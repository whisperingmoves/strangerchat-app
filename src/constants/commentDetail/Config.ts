import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const FREE_TIMES = (times: number) =>
  __('Free %d times', [times], languageCode);

export const WARM_UP = (gender: 'male' | 'female') =>
  __('Warm %s up~~', [gender === 'male' ? 'him' : 'her'], languageCode);

export const REPORT_HINT = __(
  'Long press the comment to report~',
  [],
  languageCode,
);

export const ENTER_COMMENT = __('Enter comment...', [], languageCode);

export const REPLY_COMMENT = (username: string) =>
  __('Re %s: ', [username], languageCode);

export const POST_HEATED_SUCCESSFULLY = __(
  'Post heated successfully',
  [],
  languageCode,
);

export const FREE_HEATING_TIMES_HAVE_BEEN_USED_UP = __(
  'Free heating times have been used up',
  [],
  languageCode,
);

export const SUCCESSFUL_GIFT_GIVING = __(
  'Successful gift giving',
  [],
  languageCode,
);
