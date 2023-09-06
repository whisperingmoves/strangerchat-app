export interface MarkedAsReadMessage {
  conversationId: string;
  messageId: string;
  readStatus?: number;
}
