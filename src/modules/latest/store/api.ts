import {
  getLatestPosts as getLatestPostsApi,
  GetLatestPostsRequest,
  LatestPostData,
} from '../../../apis/post/getLatestPosts';

export const getLatestPosts = async (
  request: GetLatestPostsRequest,
  token: string,
): Promise<LatestPostData[]> => {
  return await getLatestPostsApi(request, token);
};
