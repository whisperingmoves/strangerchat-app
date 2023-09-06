export interface RecentMessage {
  conversationId: string;
  messageId: string;
  senderId: string;
  recipientId: string;
  sentTime: number;
  content: string;
  type?: number;
  readStatus?: number;
}
