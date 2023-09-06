import {Socket} from 'socket.io-client';
import {emitMessages} from '../socket';

export interface GetRecentChatConversations {
  timestamp?: number;
}

export const getRecentChatConversations = async (
  data: GetRecentChatConversations,
  socket: Socket | undefined,
): Promise<void> => {
  return await emitMessages(socket, {
    type: 1,
    data,
  });
};
