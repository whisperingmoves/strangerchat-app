export interface RecentConversation {
  conversationId: string;
  opponentUserId: string;
  opponentAvatar: string;
  opponentUsername?: string;
  opponentOnlineStatus?: number;
  opponentDistance?: number;
  lastMessageTime: number;
  lastMessageContent: string;
  lastMessageType?: number;
  unreadCount?: number;
  isFollowed?: number;
  isBlocked?: number;
}
