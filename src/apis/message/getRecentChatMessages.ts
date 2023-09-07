import {emitMessages} from '../socket';

export interface GetRecentChatMessages {
  conversationId: string;
  timestamp?: number;
}

export const getRecentChatMessages = async (
  data: GetRecentChatMessages,
): Promise<void> => {
  return await emitMessages({
    type: 3,
    data,
  });
};
