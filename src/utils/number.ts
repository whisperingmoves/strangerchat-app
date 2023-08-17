export const formatNumber = (num: number) => {
  const str = num.toString();

  const parts = str.split('.');

  parts[0] = parts[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');

  return parts.join('.');
};

export const formatNumberWithSuffix = (number: number): string => {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const suffixIndex = Math.floor(Math.log10(number) / 3);
  const formattedNumber = (number / Math.pow(1000, suffixIndex)).toFixed(0);
  return formattedNumber + suffixes[suffixIndex];
};
