import {GiftData} from '../../apis/gift/getReceivedGifts';

export const splitListValue = (A: GiftData[]): [GiftData[], GiftData[]] => {
  const B: GiftData[] = A.slice(0, 3);
  const C: GiftData[] = A.slice(3);

  return [B, C];
};

export const swapFirstTwoItems = (A: GiftData[]): GiftData[] => {
  if (A.length < 2) {
    return A;
  }

  const [second, first, ...rest] = A;

  return [first, second, ...rest];
};
