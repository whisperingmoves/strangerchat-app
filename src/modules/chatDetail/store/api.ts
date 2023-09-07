import {
  GetRecentChatMessages,
  getRecentChatMessages as getRecentChatMessagesApi,
} from '../../../apis/message/getRecentChatMessages';
import {
  SendMessage,
  sendMessage as sendMessageApi,
} from '../../../apis/message/sendMessage';
import {
  MarkMessageAsRead,
  markMessageAsRead as markMessageAsReadApi,
} from '../../../apis/message/markMessageAsRead';

export const getRecentChatMessages = async (
  data: GetRecentChatMessages,
): Promise<void> => {
  await getRecentChatMessagesApi(data);
};

export const sendMessage = async (data: SendMessage): Promise<void> => {
  await sendMessageApi(data);
};

export const markMessageAsRead = async (
  data: MarkMessageAsRead,
): Promise<void> => {
  await markMessageAsReadApi(data);
};