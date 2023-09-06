import {Socket} from 'socket.io-client';
import {emitMessages} from '../socket';

export interface GetRecentChatMessages {
  conversationId: string;
  timestamp?: number;
}

export const getRecentChatMessages = async (
  data: GetRecentChatMessages,
  socket: Socket | undefined,
): Promise<void> => {
  return await emitMessages(socket, {
    type: 3,
    data,
  });
};
