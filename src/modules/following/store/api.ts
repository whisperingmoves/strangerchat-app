import {
  FollowedPostData,
  getFollowedPosts as getFollowedPostsApi,
  GetFollowedPostsRequest,
} from '../../../apis/post/getFollowedPosts';

export const getFollowedPosts = async (
  request: GetFollowedPostsRequest,
  token: string,
): Promise<FollowedPostData[]> => {
  return await getFollowedPostsApi(request, token);
};
