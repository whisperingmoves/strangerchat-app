import axiosInstance from '../axios';

export interface GetLatestPostsRequest {
  keyword?: string;
  page?: number;
  pageSize?: number;
  filter?: number;
}

export interface LatestPostData {
  authorId: string;
  authorAvatar: string;
  authorName?: string;
  createTime: number;
  images?: string[];
  content: string;
  city?: string;
  likeCount?: number;
  commentCount?: number;
  postId: string;
  isLiked?: number;
  isFollowed?: number;
  isBlocked?: number;
  conversationId?: string;
  atUsers?: {id: string; username?: string}[];
}

export const getLatestPosts = async (
  request: GetLatestPostsRequest,
  token: string,
): Promise<LatestPostData[]> => {
  const {keyword, page, pageSize, filter} = request;

  const response = await axiosInstance.get('/posts/latest', {
    params: {
      keyword,
      page: page || 1,
      pageSize: pageSize || 10,
      filter: filter || 0,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
