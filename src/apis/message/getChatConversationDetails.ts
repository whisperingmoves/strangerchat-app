import {Socket} from 'socket.io-client';
import {emitMessages} from '../socket';

export interface GetChatConversationDetails {
  conversationId: string;
}

export const getChatConversationDetails = async (
  data: GetChatConversationDetails,
  socket: Socket | undefined,
): Promise<void> => {
  return await emitMessages(socket, {
    type: 2,
    data,
  });
};
