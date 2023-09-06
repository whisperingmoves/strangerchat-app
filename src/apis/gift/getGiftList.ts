import axiosInstance from '../axios';

export interface GiftData {
  id: string;
  image: string;
  name: string;
  value: number;
}

export const getGiftList = async (
  page: number = 1,
  pageSize: number = 10,
  token: string,
): Promise<GiftData[]> => {
  const response = await axiosInstance.get('/gifts', {
    params: {
      page,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
