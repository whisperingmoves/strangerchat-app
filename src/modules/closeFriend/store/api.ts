import {
  getFriends as getFriendsApi,
  GetFriendsRequest,
  GetFriendsResponse,
} from '../../../apis/user/getFriends';

export const getFriends = async (
  request: GetFriendsRequest,
  token: string,
): Promise<GetFriendsResponse> => {
  return await getFriendsApi(request, token);
};
