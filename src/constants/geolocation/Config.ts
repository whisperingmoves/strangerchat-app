import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const UNABLE_TO_OPEN_SETTINGS = __(
  'Unable to open settings',
  [],
  languageCode,
);

export const LOCATION_PERMISSION_DENIED = __(
  'Location permission denied',
  [],
  languageCode,
);

export const TURN_ON_LOCATION_TITLE = (displayName: string) =>
  __(
    'Turn on Location Services to allow "%s" to determine your location.',
    [displayName],
    languageCode,
  );

export const GO_TO_SETTINGS = __('Go to Settings', [], languageCode);

export const DO_NOT_USE_LOCATION = __("Don't Use Location", [], languageCode);

export const LOCATION_PERMISSION_DENIED_BY_USER = __(
  'Location permission denied by user.',
  [],
  languageCode,
);

export const LOCATION_PERMISSION_REVOKED_BY_USER = __(
  'Location permission revoked by user.',
  [],
  languageCode,
);
