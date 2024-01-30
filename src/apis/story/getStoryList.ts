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

export interface Story {
  userId: string;
  avatar: string;
  createTime: number;
  username?: string;
  relation?: number;
  firstImage?: string;
  online?: number;
}

export const getStoryList = async (
  page: number = 1,
  pageSize: number = 10,
  token: string,
): Promise<Story[]> => {
  const response = await axiosInstance.get('/stories', {
    params: {
      page,
      pageSize,
    },
    headers: new AxiosHeaders({
      Authorization: `Bearer ${token}`,
    }),
  });

  return response.data;
};
