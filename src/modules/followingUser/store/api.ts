import {
  getFollowingUsers as getFollowingUsersApi,
  GetFollowingUsersRequest,
  UserData as FollowingUserData,
} from '../../../apis/user/getFollowingUsers';

export const getFollowingUsers = async (
  request: GetFollowingUsersRequest,
  token: string,
): Promise<FollowingUserData[]> => {
  return await getFollowingUsersApi(request, token);
};
