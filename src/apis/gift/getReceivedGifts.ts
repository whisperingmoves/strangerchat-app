import axiosInstance from '../axios';

export interface GiftData {
  userId: string;
  count: number;
  currentRanking: number;
  diff: number;
  username?: string;
  avatar: string;
}

export interface GetReceivedGiftsRequest {
  range?: 0 | 1 | 2;
}

export const getReceivedGifts = async (
  request: GetReceivedGiftsRequest,
  token: string,
): Promise<GiftData[]> => {
  const {range} = request;

  const response = await axiosInstance.get('/users/me/gifts/received', {
    params: {
      range: range || 0,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
