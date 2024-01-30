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

export interface GetFollowingUsersRequest {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export interface UserData {
  userId: string;
  userAvatar: string;
  username?: string;
  latestPostContent?: string;
  conversationId?: string;
  isFollowed?: number;
}

export const getFollowingUsers = async (
  request: GetFollowingUsersRequest,
  token: string,
): Promise<UserData[]> => {
  const {page, pageSize, keyword} = request;

  const params: GetFollowingUsersRequest = {
    page: page || 1,
    pageSize: pageSize || 10,
  };

  if (keyword) {
    params.keyword = keyword;
  }

  const response = await axiosInstance.get('/users/following', {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
