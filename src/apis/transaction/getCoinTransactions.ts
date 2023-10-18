import axiosInstance from '../axios';

export interface TransactionData {
  id: string;
  createdAt: number;
  currency: string;
  amount: number;
}

export interface GetCoinTransactionsRequest {
  page?: number;
  pageSize?: number;
  date?: string;
}

export const getCoinTransactions = async (
  request: GetCoinTransactionsRequest,
  token: string,
): Promise<TransactionData[]> => {
  const response = await axiosInstance.get('/transactions/coins', {
    params: request,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
