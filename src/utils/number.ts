export const formatNumber = (num: number) => {
  const str = num.toString();

  const parts = str.split('.');

  parts[0] = parts[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');

  return parts.join('.');
};
