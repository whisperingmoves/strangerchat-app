import {
  getReceivedGifts as getReceivedGiftsApi,
  GetReceivedGiftsRequest,
  GiftData,
} from '../../../apis/gift/getReceivedGifts';

export const getReceivedGifts = async (
  request: GetReceivedGiftsRequest,
  token: string,
): Promise<GiftData[]> => {
  return await getReceivedGiftsApi(request, token);
};
