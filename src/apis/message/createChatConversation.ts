import {Socket} from 'socket.io-client';
import {emitMessages} from '../socket';

export interface CreateChatConversation {
  clientConversationId: string;
  opponentUserId: string;
}

export const createChatConversation = async (
  data: CreateChatConversation,
  socket: Socket | undefined,
): Promise<void> => {
  return await emitMessages(socket, {
    type: 0,
    data,
  });
};
