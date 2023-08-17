import {
  getFollowedPosts as getFollowedPostsApi,
  PostData,
} from '../../../apis/post/getFollowedPosts';

export const getFollowedPosts = async (
  page: number = 1,
  pageSize: number = 10,
  token: string,
): Promise<PostData[]> => {
  return await getFollowedPostsApi({page, pageSize}, token);
};
