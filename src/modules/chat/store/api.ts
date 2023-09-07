import {
  CreateChatConversation,
  createChatConversation as createChatConversationApi,
} from '../../../apis/message/createChatConversation';
import {
  GetRecentChatConversations,
  getRecentChatConversations as GetRecentChatConversationsApi,
} from '../../../apis/message/getRecentChatConversations';
import {
  GetChatConversationDetails,
  getChatConversationDetails as getChatConversationDetailsApi,
} from '../../../apis/message/getChatConversationDetails';

export const createChatConversation = async (
  data: CreateChatConversation,
): Promise<void> => {
  await createChatConversationApi(data);
};

export const getRecentChatConversations = async (
  data: GetRecentChatConversations,
): Promise<void> => {
  await GetRecentChatConversationsApi(data);
};

export const getChatConversationDetails = async (
  data: GetChatConversationDetails,
): Promise<void> => {
  await getChatConversationDetailsApi(data);
};
