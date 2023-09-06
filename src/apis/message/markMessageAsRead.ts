import {Socket} from 'socket.io-client';
import {emitMessages} from '../socket';

export interface MarkMessageAsRead {
  conversationId: string;
  messageId: string;
}

export const markMessageAsRead = async (
  data: MarkMessageAsRead,
  socket: Socket | undefined,
): Promise<void> => {
  return await emitMessages(socket, {
    type: 5,
    data,
  });
};
