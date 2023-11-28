import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const BAD_REQUEST = __('Bad Request', [], languageCode);

export const FORBIDDEN = __('Access Forbidden', [], languageCode);

export const NOT_FOUND = __('Resource Not Found', [], languageCode);

export const TOO_MANY_REQUESTS = (retryAfter: string) =>
  __(
    'Too Many Requests. Please retry after %s seconds.',
    [retryAfter],
    languageCode,
  );

export const INTERNAL_SERVER_ERROR = __(
  'Internal Server Error',
  [],
  languageCode,
);
