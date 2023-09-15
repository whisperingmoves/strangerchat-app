import {emitMessages} from '../socket';

export interface SendMessage {
  conversationId: string;
  clientMessageId: string;
  opponentUserId: string;
  content: string;
  contentLength?: number;
  type?: number;
  giftId?: string;
}

export const sendMessage = async (data: SendMessage): Promise<void> => {
  return await emitMessages({
    type: 4,
    data,
  });
};
