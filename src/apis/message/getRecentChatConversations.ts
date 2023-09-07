import {emitMessages} from '../socket';

export interface GetRecentChatConversations {
  timestamp?: number;
}

export const getRecentChatConversations = async (
  data: GetRecentChatConversations,
): Promise<void> => {
  return await emitMessages({
    type: 1,
    data,
  });
};
