export interface RecentMessage {
  conversationId: string;
  messageId: string;
  senderId: string;
  recipientId: string;
  sentTime: number;
  content: string;
  contentLength?: number;
  type?: number;
  readStatus?: number;
}
