import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const VERIFICATION_CODE = __('Verification code', [], languageCode);

export const VERIFICATION_CODE_DESC = __('Has been sent to ', [], languageCode);

export const RESEND_IN_SECONDS = (second: number) =>
  __('Resend in %d seconds', [second], languageCode);

export const RESEND = __('Resend', [], languageCode);

export const CODE_ERROR = __('Code error', [], languageCode);
