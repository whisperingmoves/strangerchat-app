import {Socket} from 'socket.io-client';
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
  socket: Socket | undefined,
): Promise<void> => {
  await createChatConversationApi(data, socket);
};

export const getRecentChatConversations = async (
  data: GetRecentChatConversations,
  socket: Socket | undefined,
): Promise<void> => {
  await GetRecentChatConversationsApi(data, socket);
};

export const getChatConversationDetails = async (
  data: GetChatConversationDetails,
  socket: Socket | undefined,
): Promise<void> => {
  await getChatConversationDetailsApi(data, socket);
};
