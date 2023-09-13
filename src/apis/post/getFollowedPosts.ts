import axiosInstance from '../axios';

export interface GetFollowedPostsRequest {
  page?: number;
  pageSize?: number;
}

export interface FollowedPostData {
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
  conversationId?: string;
  atUsers?: {id: string; username?: string}[];
  isBlocked?: number;
}

export const getFollowedPosts = async (
  request: GetFollowedPostsRequest,
  token: string,
): Promise<FollowedPostData[]> => {
  const {page, pageSize} = request;

  const response = await axiosInstance.get('/posts/follows', {
    params: {
      page: page || 1,
      pageSize: pageSize || 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
