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
  registerUser as registerUserApi,
  RegisterUserRequest,
  RegisterUserResponse,
} from '../../apis/user/registerUser';
import {
  followOrUnfollowUser as followOrUnfollowUserApi,
  FollowUserRequest,
} from '../../apis/user/followOrUnfollowUser';
import {
  blockOrUnblockUser as blockOrUnblockUserApi,
  BlockUserRequest,
} from '../../apis/user/blockOrUnblockUser';
import {
  reportUser as reportUserApi,
  ReportUserRequest,
} from '../../apis/user/reportUser';
import {
  uploadAvatar as uploadAvatarApi,
  UploadAvatarResponse,
} from '../../apis/resource/uploadAvatar';
import {
  updateUserProfile as updateUserProfileApi,
  UpdateUserProfileRequest,
} from '../../apis/user/updateUserProfile';
import {
  getMyPosts as getMyPostsApi,
  GetMyPostsRequest,
  MyPostData,
} from '../../apis/user/getMyPosts';

export const registerUser = async (
  request: RegisterUserRequest,
): Promise<RegisterUserResponse> => {
  return await registerUserApi(request);
};

export const followOrUnfollowUser = async (
  request: FollowUserRequest,
  token: string,
): Promise<void> => {
  return await followOrUnfollowUserApi(request, token);
};

export const blockOrUnblockUser = async (
  request: BlockUserRequest,
  token: string,
): Promise<void> => {
  return await blockOrUnblockUserApi(request, token);
};

export const reportUser = async (
  request: ReportUserRequest,
  token: string,
): Promise<void> => {
  return await reportUserApi(request, token);
};

export const uploadAvatar = async (
  avatar: string,
): Promise<UploadAvatarResponse> => {
  return await uploadAvatarApi(avatar);
};

export const updateUserProfile = async (
  request: UpdateUserProfileRequest,
  token: string,
): Promise<void> => {
  return await updateUserProfileApi(request, token);
};

export const getMyPosts = async (
  request: GetMyPostsRequest,
  token: string,
): Promise<MyPostData[]> => {
  return await getMyPostsApi(request, token);
};
