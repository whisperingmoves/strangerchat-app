import {
  getRecommendedPosts as getRecommendedPostsApi,
  GetRecommendedPostsRequest,
  RecommendedPostData,
} from '../../../apis/post/getRecommendedPosts';

export const getRecommendedPosts = async (
  request: GetRecommendedPostsRequest,
  token: string,
): Promise<RecommendedPostData[]> => {
  return await getRecommendedPostsApi(request, token);
};
