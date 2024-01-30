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
