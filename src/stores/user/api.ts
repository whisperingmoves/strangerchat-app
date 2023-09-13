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
