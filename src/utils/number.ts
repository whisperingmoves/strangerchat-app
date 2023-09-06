export const formatNumber = (num: number) => {
  const str = num.toString();

  const parts = str.split('.');

  parts[0] = parts[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');

  return parts.join('.');
};

export const formatNumberWithSuffix = (number: number): string => {
  if (number === 0) {
    return '0';
  }

  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const suffixIndex = Math.floor(Math.log10(number) / 3);
  const formattedNumber = (number / Math.pow(1000, suffixIndex)).toFixed(0);
  return formattedNumber + suffixes[suffixIndex];
};

export const convertNumberToString = (num: number): string => {
  if (num > 99) {
    return '99+';
  } else {
    return num.toString();
  }
};
