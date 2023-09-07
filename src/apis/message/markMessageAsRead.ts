import {emitMessages} from '../socket';

export interface MarkMessageAsRead {
  conversationId: string;
  messageId: string;
}

export const markMessageAsRead = async (
  data: MarkMessageAsRead,
): Promise<void> => {
  return await emitMessages({
    type: 5,
    data,
  });
};
