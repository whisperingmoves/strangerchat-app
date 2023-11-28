import {getLocales} from 'react-native-localize';
import {__} from '../../lang/lang';

const locales = getLocales();

const languageCode = locales.length > 0 ? locales[0].languageCode : 'en';

export const GIFT_TEMPLATE = (
  username: string,
  giftQuantity: number,
  giftName: string,
) => __('%s gave you %d %s.', [username, giftQuantity, giftName], languageCode);
