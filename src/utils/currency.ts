import {formatCurrency} from 'react-native-format-currency';

export const formatPrice = (cent: number, currency: string): string => {
  const amount = parseFloat((cent / 100).toFixed(2));

  const result = formatCurrency({amount, code: currency});

  return result[0];
};
