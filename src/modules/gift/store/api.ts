import {
  getGiftList as getGiftListApi,
  GiftData,
} from '../../../apis/gift/getGiftList';
import {
  sendGift as sendGiftApi,
  SendGiftRequest,
} from '../../../apis/gift/sendGift';

export const getGiftList = async (
  page: number = 1,
  pageSize: number = 10,
  token: string,
): Promise<GiftData[]> => {
  return await getGiftListApi(page, pageSize, token);
};

export const sendGift = async (
  request: SendGiftRequest,
  token: string,
): Promise<void> => {
  return await sendGiftApi(request, token);
};
