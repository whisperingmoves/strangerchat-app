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

import axiosInstance from '../axios';

export interface GetInteractionNotificationsRequest {
  page?: number;
  pageSize?: number;
}

export interface InteractionNotificationData {
  notificationId: string;
  userAvatar: string;
  userId: string;
  username?: string;
  interactionType: number;
  interactionTime: number;
  postId: string;
  postAuthorId: string;
  postAuthorName?: string;
  postImage?: string;
  readStatus?: number;
  commentId?: string;
}

export const getInteractionNotifications = async (
  request: GetInteractionNotificationsRequest,
  token: string,
): Promise<InteractionNotificationData[]> => {
  const {page, pageSize} = request;

  const response = await axiosInstance.get('/notifications/interaction', {
    params: {
      page: page || 1,
      pageSize: pageSize || 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
