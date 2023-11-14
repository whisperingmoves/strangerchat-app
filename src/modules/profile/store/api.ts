import {
  getUserDetail as getUserDetailApi,
  GetUserDetailRequest,
  GetUserDetailResponse,
} from '../../../apis/user/getUserDetail';
import {
  getUserPosts as getUserPostsApi,
  GetUserPostsRequest,
  UserPostData,
} from '../../../apis/user/getUserPosts';

export const getUserDetail = async (
  request: GetUserDetailRequest,
  token: string,
): Promise<GetUserDetailResponse> => {
  return await getUserDetailApi(request, token);
};

export const getUserPosts = async (
  request: GetUserPostsRequest,
  token: string,
): Promise<UserPostData[]> => {
  return await getUserPostsApi(request, token);
};
