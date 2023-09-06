import {Conversation} from '../chat/store/slice';

export const calculateTotalUnreadCount = (
  conversationList: Conversation[],
): number => {
  return conversationList.reduce((total, conversation) => {
    return total + (conversation.unreadCount || 0);
  }, 0);
};
