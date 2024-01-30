// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
import {
  uploadMessage as uploadMessageApi,
  UploadMessageResponse,
} from '../../../apis/resource/uploadMessage';

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

export const uploadMessage = async (
  uri: string,
): Promise<UploadMessageResponse> => {
  return await uploadMessageApi(uri);
};
