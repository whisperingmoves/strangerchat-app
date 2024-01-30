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

export interface VerifyCodeRequest {
  mobile: string;
  code: string;
  longitude?: number;
  latitude?: number;
  language?: string;
}

export interface VerifyCodeResponse {
  token: string;
  userId: string;
  gender: string;
  birthday: string;
  avatar: string;
  giftsReceived?: number;
  username?: string;
  city?: string;
  followingCount?: number;
  followersCount?: number;
  visitorsCount?: number;
  freeHeatsLeft?: number;
  coinBalance?: number;
  checkedDays?: number;
  lastCheckDate?: number;
}

export const UserNotFoundErrorMessage = 'User Not Found';

export const verifyCode = async (
  request: VerifyCodeRequest,
): Promise<VerifyCodeResponse> => {
  const response = await axiosInstance.post(
    '/verifications/verifyCode',
    request,
  );

  if (response.status === 201) {
    throw new Error(UserNotFoundErrorMessage);
  }

  return response.data;
};
