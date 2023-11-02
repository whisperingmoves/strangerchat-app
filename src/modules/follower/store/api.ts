import {
  getFollowers as getFollowersApi,
  GetFollowersRequest,
  UserData as FollowerUserData,
} from '../../../apis/user/getFollowers';

export const getFollowers = async (
  request: GetFollowersRequest,
  token: string,
): Promise<FollowerUserData[]> => {
  return await getFollowersApi(request, token);
};
