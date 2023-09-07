import {emitMessages} from '../socket';

export interface GetChatConversationDetails {
  conversationId: string;
}

export const getChatConversationDetails = async (
  data: GetChatConversationDetails,
): Promise<void> => {
  return await emitMessages({
    type: 2,
    data,
  });
};
