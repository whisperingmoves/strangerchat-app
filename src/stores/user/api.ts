import {
  registerUser as registerUserApi,
  RegisterUserRequest,
  RegisterUserResponse,
} from '../../apis/user/registerUser';
import {
  followOrUnfollowUser as followOrUnfollowUserApi,
  FollowUserRequest,
} from '../../apis/user/followOrUnfollowUser';

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
