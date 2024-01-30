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

export interface SharePostRequest {
  postId: string;
}

export const sharePost = async (
  request: SharePostRequest,
  token: string,
): Promise<void> => {
  const {postId} = request;

  await axiosInstance.post(`/posts/${postId}/share`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return;
};
