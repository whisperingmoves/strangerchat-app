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
