import {
  CoinProduct,
  getCoinProducts as getCoinProductsApi,
} from '../../../apis/product/getCoinProducts';
import {
  buyCoinProduct as buyCoinProductApi,
  BuyCoinProductRequest,
} from '../../../apis/product/buyCoinProduct';

export const getCoinProducts = async (
  page: number = 1,
  pageSize: number = 10,
  token: string,
): Promise<CoinProduct[]> => {
  return await getCoinProductsApi(page, pageSize, token);
};

export const buyCoinProduct = async (
  productId: string,
  request: BuyCoinProductRequest,
  token: string,
): Promise<void> => {
  return await buyCoinProductApi(productId, request, token);
};
