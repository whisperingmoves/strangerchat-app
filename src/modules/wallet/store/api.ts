import {
  getCoinTransactions as getCoinTransactionsApi,
  GetCoinTransactionsRequest,
  TransactionData,
} from '../../../apis/transaction/getCoinTransactions';

export const getCoinTransactions = async (
  request: GetCoinTransactionsRequest,
  token: string,
): Promise<TransactionData[]> => {
  return await getCoinTransactionsApi(request, token);
};
