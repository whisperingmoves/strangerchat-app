export interface SentMessage {
  conversationId: string;
  clientMessageId?: string;
  messageId: string;
  senderId: string;
  recipientId: string;
  content: string;
  contentLength?: number;
  type?: number;
  sentTime: number;
  readStatus?: number;
  sendStatus?: number;
}
