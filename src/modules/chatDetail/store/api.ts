import {Socket} from 'socket.io-client';
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
  socket: Socket | undefined,
): Promise<void> => {
  await getRecentChatMessagesApi(data, socket);
};

export const sendMessage = async (
  data: SendMessage,
  socket: Socket | undefined,
): Promise<void> => {
  await sendMessageApi(data, socket);
};

export const markMessageAsRead = async (
  data: MarkMessageAsRead,
  socket: Socket | undefined,
): Promise<void> => {
  await markMessageAsReadApi(data, socket);
};
