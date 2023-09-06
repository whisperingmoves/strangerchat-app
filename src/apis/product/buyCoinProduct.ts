import axiosInstance from '../axios';

export interface BuyCoinProductRequest {
  receipt: string;
}

export const buyCoinProduct = async (
  productId: string,
  request: BuyCoinProductRequest,
  token: string,
): Promise<void> => {
  await axiosInstance.post(`/products/coins/${productId}/buy`, request, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
