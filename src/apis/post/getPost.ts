import axiosInstance from '../axios';

export interface GetPostResponse {
  authorId: string;
  authorAvatar: string;
  authorName?: string;
  createTime: number;
  isFollowed?: number;
  isBlocked?: number;
  images?: string[];
  content: string;
  city?: string;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
  postId: string;
  isLiked?: number;
  isCollected?: number;
  conversationId?: string;
  atUsers?: {
    id: string;
    username?: string;
  }[];
}

export const getPost = async (
  postId: string,
  token: string,
): Promise<GetPostResponse> => {
  const response = await axiosInstance.get(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
