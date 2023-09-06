import axiosInstance from '../axios';

export interface SendGiftRequest {
  receiverId: string;
  giftId: string;
  quantity: number;
}

export const sendGift = async (
  request: SendGiftRequest,
  token: string,
): Promise<void> => {
  await axiosInstance.post('/gifts/send', request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
