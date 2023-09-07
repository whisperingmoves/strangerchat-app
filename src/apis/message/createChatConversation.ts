import {emitMessages} from '../socket';

export interface CreateChatConversation {
  clientConversationId: string;
  opponentUserId: string;
}

export const createChatConversation = async (
  data: CreateChatConversation,
): Promise<void> => {
  return await emitMessages({
    type: 0,
    data,
  });
};
