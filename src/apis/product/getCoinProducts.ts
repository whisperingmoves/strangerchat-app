import axiosInstance from '../axios';

export interface CoinProduct {
  productId: string;
  coins: number;
  price: number;
  currency: string;
  originalPrice?: number;
}

export const getCoinProducts = async (
  page = 1,
  pageSize = 10,
  token: string,
): Promise<CoinProduct[]> => {
  const response = await axiosInstance.get('/products/coins', {
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
