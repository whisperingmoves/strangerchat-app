import axiosInstance from '../axios';

export interface GetRecommendedPostsRequest {
  page?: number;
  pageSize?: number;
  longitude?: number;
  latitude?: number;
}

export interface RecommendedPostData {
  authorId: string;
  authorAvatar: string;
  authorName?: string;
  createTime: number;
  images?: string[];
  content: string;
  city?: string;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  postId: string;
  isLiked?: number;
  isFollowed?: number;
  isBlocked?: number;
  conversationId?: string;
  atUsers?: {id: string; username?: string}[];
}

export const getRecommendedPosts = async (
  request: GetRecommendedPostsRequest,
  token: string,
): Promise<RecommendedPostData[]> => {
  const {page, pageSize, longitude, latitude} = request;

  const response = await axiosInstance.get('/posts/recommended', {
    params: {
      page: page || 1,
      pageSize: pageSize || 10,
      longitude,
      latitude,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
