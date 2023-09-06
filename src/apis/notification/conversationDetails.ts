export interface ConversationDetails {
  conversationId: string;
  opponentUserId: string;
  opponentAvatar: string;
  opponentUsername?: string;
  opponentOnlineStatus?: number;
  opponentDistance?: number;
  lastMessageTime: number;
  lastMessageContent: string;
  unreadCount?: number;
}
