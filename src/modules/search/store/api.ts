import {
  getHotPosts as getHotPostsApi,
  HotPost,
} from '../../../apis/post/getHotPosts';

export const getHotPosts = async (token: string): Promise<HotPost[]> => {
  return await getHotPostsApi(token);
};
