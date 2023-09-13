export interface CreatedConversation {
  clientConversationId?: string;
  conversationId: string;
  opponentUserId: string;
  opponentAvatar: string;
  opponentUsername?: string;
  opponentOnlineStatus?: number;
  opponentDistance?: number;
  isFollowed?: number;
  isBlocked?: number;
}
