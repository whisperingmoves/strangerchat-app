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
import {AxiosHeaders} from 'axios';

export interface CreatePostRequest {
  content: string;
  city?: string;
  longitude?: string;
  latitude?: string;
  images?: string[];
  visibility?: number;
  atUsers?: string[];
}

export interface CreatePostResponse {
  postId: string;
}

export const createPost = async (
  request: CreatePostRequest,
  token: string,
): Promise<CreatePostResponse> => {
  const response = await axiosInstance.post('/posts', request, {
    headers: new AxiosHeaders({
      Authorization: `Bearer ${token}`,
    }),
  });

  return response.data;
};
