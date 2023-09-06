import {Socket} from 'socket.io-client';
import {emitMessages} from '../socket';

export interface SendMessage {
  conversationId: string;
  clientMessageId: string;
  opponentUserId: string;
  content: string;
  type?: number;
}

export const sendMessage = async (
  data: SendMessage,
  socket: Socket | undefined,
): Promise<void> => {
  return await emitMessages(socket, {
    type: 4,
    data,
  });
};
