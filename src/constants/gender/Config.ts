import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const GENDER = __('Gender', [], languageCode);

export const GENDER_DESC = __('Only one chance to choose', [], languageCode);

export const MALE = __('Male', [], languageCode);

export const FEMALE = __('Female', [], languageCode);
