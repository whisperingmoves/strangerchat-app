import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const NOTIFICATION = __('Notification', [], languageCode);

export const INTERACTIVE = __('Interactive', [], languageCode);

export const STATUS = __('Status', [], languageCode);

export const SYSTEM = __('System', [], languageCode);

export const VIEW_DETAILS = __('View details', [], languageCode);

export const NO_NOTIFICATION_FOUND = __(
  'No notification found',
  [],
  languageCode,
);

export const WE_DID_NOT_FOUND_ANY_NOTIFICATION = __(
  'We did not found any notification',
  [],
  languageCode,
);
