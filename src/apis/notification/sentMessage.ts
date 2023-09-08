export interface SentMessage {
  conversationId: string;
  clientMessageId?: string;
  messageId: string;
  senderId: string;
  recipientId: string;
  content: string;
  type?: number;
  sentTime: number;
  readStatus?: number;
  sendStatus?: number;
}
